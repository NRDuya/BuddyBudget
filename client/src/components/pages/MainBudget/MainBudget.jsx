import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';
import ReadOnlyRow from './ReadMainBudgetRow';
import EditableRow from './EditMainBudgetRow';

function MainBudget() {
    const [mainBudget, setMainBudget] = useState([]);

    const [addFormData, setAddFormData] = useState({
        category: '',
        expense: 0
    });

    const [editFormData, setEditFormData] = useState({
        category: '',
        expense: 0
    });

    const [editBudgetId, setEditBudgetId] = useState(null); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Add functions
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;

        const newBudget = {
            category: addFormData.category,
            expense: addFormData.expense
        };
        const newMainBudget = [...mainBudget, newBudget];
        setMainBudget(newMainBudget);
        
        axios.post('/budget/saveMain', newBudget)
         .then((res) => {
            console.log('Successfully added to db.');            
         })
         .catch((err) => {
             console.log("Cannot add");
         })
    };
    
    // Edit Functions
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedBudget = {
            id: editBudgetId,
            category: editFormData.category,
            expense: editFormData.expense
        };
        const newMainBudget = [...mainBudget];
        const index = mainBudget.findIndex((budget) => budget.id === editBudgetId);

        newMainBudget[index] = editedBudget;

        setMainBudget(newMainBudget);
        setEditBudgetId(null);

        axios.post('http://localhost:3001/budget/editMain', editedBudget)
         .then((res) => {
           console.log('Successfully edited to db.');            
         })
         .catch((err) => {
            console.log("Cannot edit");
         })
    };

    const handleEditClick = (event, budget) => {
        event.preventDefault();
        setEditBudgetId(budget.id);

        const formValues = {
            category: budget.category,
            expense: budget.expense
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

        axios.delete('/budget/deleteMain', {data: {id: budgetId}})
         .then((res) => {
           console.log('Successfully deleted from db.');            
         })
         .catch((err) => {
            console.log("Cannot delete");
         })
    };

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios('/budget/getMain')
         .then((res) => {
            setMainBudget(res.data.budget);
             
         })
         .catch((err) => {
            console.error("Error fetching data", err);
            setError(err);
         })
         .finally(() => {
            setLoading(false);
         })
    }, [])

    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <Navbar />
            <div className='app-container'>    
                <h2>
                    Main BudGet
                </h2>

                <form onSubmit={ handleEditFormSubmit }>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Set BudGet</th>
                                <th>Actions</th>
                            </tr>

                        </thead>
                        <tbody>
                            {mainBudget.map((data) => (
                                <>
                                    { data.id === editBudgetId ? 
                                     <EditableRow 
                                        editFormData={ editFormData } 
                                        handleEditFormChange={ handleEditFormChange } 
                                        handleEditCancelClick={ handleEditCancelClick } /> : 
                                     <ReadOnlyRow 
                                        data={ data } 
                                        handleEditClick={ handleEditClick }
                                        handleDeleteClick={ handleDeleteClick }/> 
                                    }
                                </>
                            ))}
                        </tbody>
                    </table>
                </form>


                <h2>Add a BudGet</h2>
                <form onSubmit={ handleAddFormSubmit }>
                    <input type='text' name="category" placeholder="Category" onChange={handleAddFormChange} required/>
                    <input type='number' name="expense" placeholder="BudGeted" step='.01' onChange={handleAddFormChange} required/>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </>
    )
}

export default MainBudget;
