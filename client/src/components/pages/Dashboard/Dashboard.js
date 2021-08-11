import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';

function Dashboard() {
    const categoryRef = useRef();
    const priceRef = useRef();

    const [mainBudget, setMainBudget] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); 
        axios.defaults.withCredentials = true;

        const newBudget = {
            category: categoryRef.current.value,
            price: priceRef.current.value
        };

        const newMainBudget = [...mainBudget, newBudget];
        setMainBudget(newMainBudget);
        
        axios.post('http://localhost:3001/budget/saveMain', newBudget)
         .then((res) => {
            console.log('Successfully added to db.');            
         })
         .catch((err) => {
             console.log("Cannot add");
         })
    }

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios('http://localhost:3001/budget/getMain')
         .then((res) => {
            setMainBudget(res.data.budget)
             
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
    if(error) return error;
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
                        {mainBudget.map((data) => (
                            <tr>
                                <td>{data.category}</td>
                                <td>${data.price}</td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
                <h2>Add a BudGet</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input type='text' ref={categoryRef} placeholder="Category" required/>
                    <input type='number' ref={priceRef} placeholder="BudGeted" step='.01' required/>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </>
    )
}

export default Dashboard;
