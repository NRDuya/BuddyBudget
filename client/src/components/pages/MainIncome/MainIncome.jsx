import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';

function MainIncome() {
    const [mainIncome, setMainIncome] = useState([]);

    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <Navbar />
            <div className='app-container'>    
                <h2>
                    Main Income
                </h2>

                <form onSubmit={ handleEditFormSubmit }>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Set Income</th>
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

export default MainIncome;