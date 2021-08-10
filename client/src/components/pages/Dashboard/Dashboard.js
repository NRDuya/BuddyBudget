import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';
import data from './data.json';

function Dashboard() {
    const categoryRef = useRef();
    const costRef = useRef();

    const [budgets, setBudget] = useState(data);

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;

        const newBudget = {
            category: categoryRef.current.value,
            cost: costRef.current.value
        };

        const newBudgetList = [...budgets, newBudget];
        setBudget(newBudgetList);
        
        axios.post('http://localhost:3001/budget/saveMain', newBudget)
         .then((res) => {
            if(res.data.success){
               console.log('success')
            }
            else{
                window.location.reload(false);
            }
         })
    }

    return (
        <>
            <Navbar />
            <div className='app-container'>    
                <h2>
                    Main BudGet
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Category
                            </th>
                            <th>
                                Set BudGet
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                        {budgets.map((datas) => (
                            <tr>
                                <td>{datas.category}</td>
                                <td>{datas.cost}</td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
                <h2>Add a BudGet</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input type='text' ref={categoryRef} placeholder="Category" required/>
                    <input type='number' ref={costRef} placeholder="BudGeted" step='.01' required/>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </>
    )
}

export default Dashboard;
