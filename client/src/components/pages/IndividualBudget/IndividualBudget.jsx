import axios from 'axios';
import { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import { VariableBudgetContext, FixedBudgetContext, IncomeBudgetContext } from '../../contexts/MainBudgetContext';
import ReadIndividualBudgetRow from './ReadIndividualBudgetRow';
import EditIndividualBudgetRow from './EditIndividualBudgetRow';
import AlertComponent from '../../AlertComponent';

function IndividualBudget() {
    const { type } = useParams();

    const initialData = {
        category: '',
        expense: null
    }
    
    const [title, setTitle] = useState(type);

    const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
    const [fixedBudget, setFixedBudget] = useContext(FixedBudgetContext);
    const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);
    const [individualBudget, setIndividualBudget] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [addFormData, setAddFormData] = useState(initialData);

    const [editFormData, setEditFormData] = useState(initialData);

    const [editBudgetId, setEditBudgetId] = useState(null); 

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        type: ''
    });

    useEffect(() => {
        switch(type) {
            case "variable":
              setIndividualBudget(variableBudget);
              break;
            case "fixed":
              setIndividualBudget(fixedBudget);
              break;
            case "income":
              setIndividualBudget(incomeBudget);
              break;
            default:
              break;
        }
        setTitle(type.charAt(0).toUpperCase() + type.slice(1));
    }, [type, variableBudget, fixedBudget, incomeBudget])

    // Add functions
    const handleShowAddForm = () => {
        setShowAddForm(!showAddForm);
    }

    const handleAddFormCat = (event) => {
        event.preventDefault();
        const value = event.target.value;

        const newFormData = {...addFormData};
        newFormData.category = value;
        setAddFormData(newFormData);
    }

    const handleAddFormExpense = (value) => {
        const newFormData = {...addFormData};
        newFormData.expense = value;
        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;

        const newBudget = {
            id: -1,
            category: addFormData.category,
            expense: addFormData.expense
        };

        axios.post(`/${type}Budget/save`, newBudget)
         .then((res) => {
            if (res.data.success) {
                newBudget.id = res.data.budgetId;
                const newMainBudget = [...individualBudget, newBudget];
                setIndividualBudget(newMainBudget);

                console.log('Successfully added to db.');            
            } else {
                setAddFormData(initialData);
                console.log(res.data.message);
            };
         })
         .catch((err) => {
             console.log(err);
             console.log("Cannot add");
         });

        setShowAddForm(!showAddForm);
    };
    
    // Edit Functions
    const handleEditFormCat = (event) => {
        event.preventDefault();
        const value = event.target.value;

        const newFormData = {...editFormData};
        newFormData.category = value;
        setEditFormData(newFormData);
    }

    const handleEditFormExpense = (value) => {
        const newFormData = {...editFormData};
        newFormData.expense = value;
        setEditFormData(newFormData);
    }
    
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
                const newMainBudget = [...individualBudget];
                const index = individualBudget.findIndex((budget) => budget.id === editBudgetId);
                newMainBudget[index] = editedBudget;
                setIndividualBudget(newMainBudget);

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
        const newMainBudget = [...individualBudget];
        const index = individualBudget.findIndex((budget) => budget.id === budgetId);

        newMainBudget.splice(index, 1);
        setIndividualBudget(newMainBudget);

        axios.delete(`/${type}Budget/delete`, {data: {id: budgetId}})
         .then((res) => {
           console.log('Successfully deleted from db.');            
         })
         .catch((err) => {
            console.log("Cannot delete");
         })
    };

    return (
        <>
            {
                alert.show &&
                <AlertComponent alert={alert} setAlert={setAlert} />
            }
            <div className='container d-flex flex-column mt-3' style={{ width: '75%' }}>    
                <h2 className="card-header text-center">
                    { title } Budget
                </h2>

                <button onClick={handleShowAddForm} className="btn btn-primary m-3">
                    Add a Budget
                </button>

                <form onSubmit={ handleEditFormSubmit }>
                    <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                        <thead className='table-light'>
                            <tr>
                                <th>Category</th>
                                <th>Set BudGet</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {individualBudget.map((data) => (
                                <Fragment key={ data.id }>
                                    { 
                                        data.id === editBudgetId ? 
                                        <EditIndividualBudgetRow 
                                        editFormData={ editFormData } 
                                        handleEditFormCat={ handleEditFormCat } 
                                        handleEditFormExpense={ handleEditFormExpense }
                                        handleEditCancelClick={ handleEditCancelClick } /> : 
                                        <ReadIndividualBudgetRow 
                                        data={ data } 
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
                                    <input type='text' placeholder='Category' value={addFormData.category} onChange={handleAddFormCat} required/>
                                </div>

                                <div className='form-group mb-3'>
                                    <CurrencyInput 
                                        placeholder='$100 Budgeted'
                                        value={addFormData.expense} 
                                        step={.01} fixedDecimalLength={2} prefix={'$'} 
                                        onValueChange={handleAddFormExpense}
                                        required
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

export default IndividualBudget;
