import axios from 'axios';
import { useState, useEffect } from 'react';
import ReadOnlyRow from './ReadMainBudgetRow';
import EditableRow from './EditMainBudgetRow';

function MainBudget({ type }) {
    const initialData = {
        category: '',
        expense: 1
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

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;

        const newBudget = {
            category: addFormData.category,
            expense: addFormData.expense
        };
        
        axios.post(`/${type}Budget/save`, newBudget)
         .then((res) => {
            if (res.data.success) {
                const newMainBudget = [...mainBudget, newBudget];
                setMainBudget(newMainBudget);

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

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedBudget = {
            id: editBudgetId,
            category: editFormData.category,
            expense: editFormData.expense
        };

        setEditBudgetId(null);

        axios.post(`/${type}Budget/edit`, editedBudget)
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

        axios.delete(`/${type}Budget/delete`, {data: {id: budgetId}})
         .then((res) => {
           console.log('Successfully deleted from db.');            
         })
         .catch((err) => {
            console.log("Cannot delete");
         })
    };

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get(`/${type}Budget/`)
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
    }, [type])

    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <div className='app-container'>    
                <h2>
                    { type } Budget
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
                    <input type='text' name="category" placeholder="Category" value={addFormData.category} onChange={handleAddFormChange} required/>
                    <input type='number' name="expense" placeholder="BudGeted" value={addFormData.expense} step='.01' onChange={handleAddFormChange} required/>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </>
    )
}

export default MainBudget;
