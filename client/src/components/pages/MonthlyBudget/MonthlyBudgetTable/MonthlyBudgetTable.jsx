import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from "react-router-dom";
import ReadMonthlyBudgetRow from './ReadMonthlyBudgetRow';
import EditableRow from './EditMonthlyBudgetRow';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';

function MonthlyBudgetTable({ budget, categories, setBudget }) {
    const { month, year } = useParams();

    const initialData = {
        date: new Date(`${year}-${month}-2`),
        category: -1,
        expense: 1,
        comment: '',
        categoryName: ''
    }

    const [mainBudget, setMainBudget] = useState([]);

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
        addFormData.date = date;
    }

    const handleDropdownAdd = (event) => {
        const categoryId = event.target.value;
        addFormData.category = parseInt(categoryId);
        const category = categories.find(category => category.id === parseInt(categoryId));
        addFormData.categoryName = category.category;
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;

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
                const newMainBudget = [...mainBudget, newBudget];
                setMainBudget(newMainBudget);
                setBudget(newMainBudget);
                console.log('Successfully added to db.');            
            } else {
                setAddFormData(initialData);
                console.log(res.data.message);
            };
         })
         .catch((err) => {
             console.log(err);
             console.log("Cannot add");
         })
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
        editFormData.date = date;
    }

    const handleDropdownEdit = (event) => {
        const categoryId = event.target.value;
        editFormData.category = parseInt(categoryId);
        const category = categories.find(category => category.id === parseInt(categoryId));
        editFormData.categoryName = category.category;
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
                const newMainBudget = [...mainBudget];
                const index = mainBudget.findIndex((budget) => budget.id === editBudgetId);
                newMainBudget[index] = editedBudget;
                setMainBudget(newMainBudget);

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
        const newMainBudget = [...mainBudget];
        const index = mainBudget.findIndex((budget) => budget.id === budgetId);

        newMainBudget.splice(index, 1);
        setMainBudget(newMainBudget);
        setBudget(newMainBudget);

        axios.delete('/monthlyBudget/delete', {data: {id: budgetId}})
         .then((res) => {
           console.log('Successfully deleted from db.');            
         })
         .catch((err) => {
            console.log("Cannot delete");
         })
    };

    useEffect(() => {
        setMainBudget(budget);
        setLoading(false);
    }, [budget])

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
                            {mainBudget.map((data) => (
                                <Fragment key={ data.id }>
                                    { 
                                     data.id === editBudgetId ? 
                                     <EditableRow 
                                        categories={ categories }
                                        editFormData={ editFormData } 
                                        handleEditFormChange={ handleEditFormChange }
                                        handleCalendarEdit={ handleCalendarEdit }
                                        handleDropdownEdit={ handleDropdownEdit } 
                                        handleEditCancelClick={ handleEditCancelClick } /> : 
                                     <ReadMonthlyBudgetRow 
                                        data={ data } 
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
                        <option>
                            Category
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category}
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

export default MonthlyBudgetTable;
