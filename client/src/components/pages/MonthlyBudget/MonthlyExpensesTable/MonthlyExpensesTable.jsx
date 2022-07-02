import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from "react-router-dom";
import ReadMonthlyExpensesRow from './ReadMonthlyExpensesRow';
import EditMonthlyExpensesRow from './EditMonthlyExpensesRow';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';

function MonthlyExpensesTable({ expenses, budget, setExpenses }) {
    const { month, year } = useParams();

    const initialData = {
        date: new Date(`${year}-${month}-2`),
        category: -1,
        expense: 1,
        comment: '',
        categoryName: ''
    }

    const [mainExpenses, setMainExpenses] = useState([]);

    const [addFormData, setAddFormData] = useState(initialData);

    const [editFormData, setEditFormData] = useState(initialData);
    const [editBudgetId, setEditBudgetId] = useState(null); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            const newBudget = {
                id: -1,
                date: addFormData.date,
                category: addFormData.category,
                expense: addFormData.expense,
                comment: addFormData.comment,
                categoryName: addFormData.categoryName
            };

            axios.post(`/monthlyBudget/save`, newBudget)
            .then((res) => {
                if (res.data.success) {
                    newBudget.id = res.data.budgetId;
                    const newMainBudget = [...mainExpenses, newBudget];
                    setMainExpenses(newMainBudget);
                    setExpenses(newMainBudget);
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

        const editedBudget = {
            id: editBudgetId,
            date: editFormData.date,
            category: editFormData.category,
            expense: editFormData.expense,
            comment: editFormData.comment,
            categoryName: editFormData.categoryName
        };
        setEditBudgetId(null);

        axios.post('/monthlyBudget/edit', editedBudget)
         .then((res) => {
            if (res.data.success) {
                const newMainBudget = [...mainExpenses];
                const index = mainExpenses.findIndex((budget) => budget.id === editBudgetId);
                newMainBudget[index] = editedBudget;
                setMainExpenses(newMainBudget);
                setExpenses(newMainBudget);
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
        const newMainBudget = [...mainExpenses];
        const index = mainExpenses.findIndex((budget) => budget.id === budgetId);

        newMainBudget.splice(index, 1);
        setMainExpenses(newMainBudget);
        setExpenses(newMainBudget);

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

    useEffect(() => {
        setMainExpenses(expenses);
        setLoading(false);
    }, [expenses])

    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <div className='app-container'>    
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
                            {mainExpenses.map((data) => (
                                <Fragment key={ data.id }>
                                    { 
                                     data.id === editBudgetId ? 
                                     <EditMonthlyExpensesRow 
                                        budget={ budget }
                                        editFormData={ editFormData } 
                                        handleEditFormChange={ handleEditFormChange }
                                        handleCalendarEdit={ handleCalendarEdit }
                                        handleDropdownEdit={ handleDropdownEdit } 
                                        handleEditCancelClick={ handleEditCancelClick } /> : 
                                     <ReadMonthlyExpensesRow 
                                        expense={ data } 
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
                                {budget_.category}
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
