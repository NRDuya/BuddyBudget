import axios from 'axios';
import { useState, useEffect } from 'react';
import ReadOnlyRow from './ReadMainBudgetRow';
import EditableRow from './EditMainBudgetRow';

function MainBudget({ type }) {
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
    

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios(`/${type}Budget/`)
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
            </div>
        </>
    )
}

export default MainBudget;
