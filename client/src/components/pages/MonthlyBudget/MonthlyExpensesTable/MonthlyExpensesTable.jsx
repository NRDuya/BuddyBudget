import axios from 'axios';
import { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { VariableBudgetContext, IncomeBudgetContext } from '../../../contexts/MainBudgetContext';
import { ExpensesContext } from '../../../contexts/MonthlyExpensesContext';
import ReadMonthlyExpensesRow from './ReadMonthlyExpensesRow';
import EditMonthlyExpensesRow from './EditMonthlyExpensesRow';
import CurrencyInput from 'react-currency-input-field';
import { Modal } from 'react-bootstrap';

function MonthlyExpensesTable() {
    const { month, year } = useParams();

    const initialData = {
        date: new Date(`${year}-${month}-1`).toISOString().split("T")[0],
        category: -1,
        expense: null,
        comment: '',
        categoryName: ''
    }

    const [minDate, setMinDate] = useState(new Date(year, month - 1, 1).toISOString().split("T")[0]);
    const [maxDate, setMaxDate] = useState(new Date(year, month, 0).toISOString().split("T")[0]);

    const [expenses, setExpenses] = useContext(ExpensesContext);
    const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
    const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);
    const [budget, setBudget] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [addFormData, setAddFormData] = useState(initialData);

    const [editBudgetId, setEditBudgetId] = useState(null); 
    const [editFormData, setEditFormData] = useState(initialData);

    useEffect(() => {
        setBudget([...variableBudget, ...incomeBudget]);
    }, [variableBudget, incomeBudget]);

    useEffect(() => {
        setMinDate(new Date(year, month - 1, 1).toISOString().split("T")[0]);
        setMaxDate(new Date(year, month, 0).toISOString().split("T")[0]);
    }, [month, year])

    // Add functions
    const handleShowAddForm = () => {
        setShowAddForm(!showAddForm);
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormExpense = (value) => {
        const newFormData = {...addFormData};
        newFormData.expense = value;
        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;

        if (addFormData.category === -1) {
            console.log("send error message")
        } else {
            // Set category name based on the expense category
            const category = budget.find(budget_ => budget_.id === parseInt(addFormData.category));
            addFormData.categoryName = category.category;
            
            const newExpense = {
                id: -1,
                date: addFormData.date,
                category: parseInt(addFormData.category),
                expense: addFormData.expense,
                comment: addFormData.comment,
                categoryName: addFormData.categoryName
            };

            axios.post(`/monthlyBudget/save`, newExpense)
                .then((res) => {
                    if (res.data.success) {
                        newExpense.id = res.data.budgetId;
                        const newExpenses = [newExpense, ...expenses];
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
                });
            
            setShowAddForm(!showAddForm);
        }
    };
    
    // Edit Functions
    const handleEditClick = (event, budget) => {
        event.preventDefault();
        setEditBudgetId(budget.id);

        const formValues = {
            date: new Date(budget.date).toISOString().split("T")[0],
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

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormExpense = (value) => {
        const newFormData = {...editFormData};
        newFormData.expense = value;
        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        // Set category name based on the expense category
        const category = budget.find(budget_ => budget_.id === parseInt(editFormData.category));
        editFormData.categoryName = category.category;

        const editedExpense = {
            id: editBudgetId,
            date: editFormData.date,
            category: parseInt(editFormData.category),
            expense: editFormData.expense,
            comment: editFormData.comment,
            categoryName: editFormData.categoryName
        };

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
                <div className='text-center'>
                    <button onClick={handleShowAddForm} className="btn btn-primary m-3">
                        Add an expense
                    </button>
                </div>
                
                <form onSubmit={ handleEditFormSubmit }>
                    <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                        <thead className='table-light'>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Expense</th>
                                <th>Comments</th>
                                <th className='text-center'>Actions</th>
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
                                        handleEditFormExpense={ handleEditFormExpense }
                                        handleEditCancelClick={ handleEditCancelClick } 
                                        minDate={ minDate }
                                        maxDate={ maxDate }/> : 
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

                {
                    showAddForm && 
                    <Modal
                    show={showAddForm}
                    onHide={handleShowAddForm}
                    size="lg"
                    centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Add a Budget
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body className="m-auto">
                            <form onSubmit={ handleAddFormSubmit }>
                                <div className='form-group mb-3'>
                                    <input className='form-control' type="date" name="date" value={addFormData.date} 
                                        min={minDate} 
                                        max={maxDate} 
                                        onChange={handleAddFormChange} 
                                        required 
                                    />
                                </div>

                                <div className='form-group mb-3'>
                                    <select className='form-select' name="category" value={addFormData.category} onChange={handleAddFormChange}>
                                        <option value={-1} disabled>
                                            Category
                                        </option>
                                        {budget.map((budget_) => (
                                            <option key={budget_.id} value={budget_.id}>
                                                {budget_.category} - {budget_.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='form-group mb-3'>
                                    <CurrencyInput 
                                        placeholder='$100 spent'
                                        value={addFormData.expense} 
                                        step={.01} fixedDecimalLength={2} prefix={'$'} 
                                        onValueChange={handleAddFormExpense}
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                <div className='form-group mb-3'>
                                    <input type='text' name="comment" placeholder="Comments" 
                                        value={addFormData.comment} onChange={handleAddFormChange}
                                        style={{ width: '100%' }} 
                                    />
                                </div>

                                <button type='submit' className='btn btn-primary' style={{ width: '100%' }}>
                                    Add
                                </button>
                            </form>
                        </Modal.Body>
                    </Modal>
                }
            </div>
        </>
    )
}

export default MonthlyExpensesTable;
