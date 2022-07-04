import axios from 'axios';
import { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { VariableBudgetContext, IncomeBudgetContext } from '../../../contexts/MainBudgetContext';
import { ExpensesContext } from '../../../contexts/MonthlyExpensesContext';
import ReadMonthlyExpensesRow from './ReadMonthlyExpensesRow';
import EditMonthlyExpensesRow from './EditMonthlyExpensesRow';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';

function MonthlyExpensesTable() {
    const { month, year } = useParams();

    const initialData = {
        date: new Date(`${year}-${month}-2`),
        category: -1,
        expense: 1,
        comment: '',
        categoryName: ''
    }

    const [expenses, setExpenses] = useContext(ExpensesContext);
    const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
    const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);
    const [budget, setBudget] = useState([]);

    const [addFormData, setAddFormData] = useState(initialData);

    const [editBudgetId, setEditBudgetId] = useState(null); 
    const [editFormData, setEditFormData] = useState(initialData);

    useEffect(() => {
        setBudget([...variableBudget, ...incomeBudget]);
    }, [variableBudget, incomeBudget])

    // Add functions
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleCalendarAdd = (date) => {
        const newFormData = {...addFormData};
        newFormData.date = date;
        setAddFormData(newFormData);
    }

    const handleDropdownAdd = (event) => {
        const categoryId = event.target.value;
        const newFormData = {...addFormData};

        newFormData.category = parseInt(categoryId);
        const category = budget.find(budget_ => budget_.id === parseInt(categoryId));
        newFormData.categoryName = category.category;
        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;
        
        if (addFormData.category === -1) {
            console.log("send error message")
        } else {
            const newExpense = {
                id: -1,
                date: addFormData.date,
                category: addFormData.category,
                expense: addFormData.expense,
                comment: addFormData.comment,
                categoryName: addFormData.categoryName
            };

            axios.post(`/monthlyBudget/save`, newExpense)
            .then((res) => {
                if (res.data.success) {
                    newExpense.id = res.data.budgetId;
                    const newExpenses = [...expenses, newExpense];
                    setExpenses(newExpenses);
                    console.log('Successfully added to db.');            
                } else {
                    console.log(res.data.message);
                };
                setAddFormData(initialData);
            })
            .catch((err) => {
                console.log(err);
                console.log("Cannot add");
            })
        }
    };
    
    // Edit Functions
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleCalendarEdit = (date) => {
        const newFormData = {...editFormData};
        newFormData.date = date;
        setEditFormData(newFormData);
    }

    const handleDropdownEdit = (event) => {
        const categoryId = event.target.value;
        const newFormData = {...editFormData};

        newFormData.category = parseInt(categoryId);
        const category = budget.find(budget_ => budget_.id === parseInt(categoryId));
        newFormData.categoryName = category.category;
        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedExpense = {
            id: editBudgetId,
            date: editFormData.date,
            category: editFormData.category,
            expense: editFormData.expense,
            comment: editFormData.comment,
            categoryName: editFormData.categoryName
        };
        setEditBudgetId(null);

        axios.post('/monthlyBudget/edit', editedExpense)
         .then((res) => {
            if (res.data.success) {
                const newExpenses = [...expenses];
                const index = expenses.findIndex((budget) => budget.id === editBudgetId);
                newExpenses[index] = editedExpense;
                setExpenses(newExpenses);
                console.log('Successfully edited to db.');            
            } else {
                console.log(res.data.message);
            };      
         })
         .catch((err) => {
            console.log("Cannot edit");
         })
    };

    const handleEditClick = (event, budget) => {
        event.preventDefault();
        setEditBudgetId(budget.id);

        const formValues = {
            date: budget.date,
            category: budget.category,
            expense: budget.expense,
            comment: budget.comment,
            categoryName: budget.categoryName
        }

        setEditFormData(formValues);
    };

    const handleEditCancelClick = () => {
        setEditBudgetId(null);
    };

    // Delete Functions
    const handleDeleteClick = (budgetId) => {
        const newExpenses = [...expenses];
        const index = expenses.findIndex((budget) => budget.id === budgetId);

        newExpenses.splice(index, 1);
        setExpenses(newExpenses);

        axios.delete('/monthlyBudget/delete', {data: {id: budgetId}})
         .then((res) => {
            if (res.data.success) {
                console.log('Successfully deleted from db.');            
            } else {
                console.log(res.data.message);
            }
         })
         .catch((err) => {
            console.log("Cannot delete");
         })
    };

    return (
        <>
            <div className='container'>    
                <form onSubmit={ handleEditFormSubmit }>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Expense</th>
                                <th>Comments</th>
                                <th>Actions</th>
                            </tr>

                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <Fragment key={ expense.id }>
                                    { 
                                     expense.id === editBudgetId ? 
                                     <EditMonthlyExpensesRow 
                                        budget={ budget }
                                        editFormData={ editFormData } 
                                        handleEditFormChange={ handleEditFormChange }
                                        handleCalendarEdit={ handleCalendarEdit }
                                        handleDropdownEdit={ handleDropdownEdit } 
                                        handleEditCancelClick={ handleEditCancelClick } /> : 
                                     <ReadMonthlyExpensesRow 
                                        expense={ expense } 
                                        handleEditClick={ handleEditClick }
                                        handleDeleteClick={ handleDeleteClick }/> 
                                    }
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>


                <h2>Add a BudGet</h2>
                <form onSubmit={ handleAddFormSubmit }>
                    <Calendar maxDetail="month" showNavigation={false} defaultValue={new Date(`${year}-${month}-2`)} showNeighboringMonth={false} onChange={handleCalendarAdd}/>
                    <Form.Select onChange={handleDropdownAdd}>
                        <option key={-1} value={-1}>
                            Category
                        </option>
                        {budget.map((budget_) => (
                            <option key={budget_.id} value={budget_.id}>
                                {budget_.category} - {budget_.type}
                            </option>
                        ))}
                    </Form.Select>          
                    <input type='number' name="expense" placeholder="BudGeted" value={addFormData.expense} step='.01' onChange={handleAddFormChange} required/>
                    <input type='text' name="comment" placeholder="Comments" value={addFormData.comment} onChange={handleAddFormChange}/>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </>
    )
}

export default MonthlyExpensesTable;
