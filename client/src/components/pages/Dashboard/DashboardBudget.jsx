import axios from 'axios';
import { useState, useEffect } from 'react';
import DashboardBudgetRow from './DashboardBudgetRow';

function DashboardBudget({ type, handleBudgetClick }) {
    const [dashboardBudget, setDashboardBudget] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios(`/${type}Budget/`)
         .then((res) => {
            setDashboardBudget(res.data.budget);
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
                <button onClick={() => handleBudgetClick(type)}>budget</button>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Set BudGet</th>
                            </tr>

                        </thead>
                        <tbody>
                            {dashboardBudget.map((data) => (
                                <>
                                    { 
                                     <DashboardBudgetRow data={ data }/> 
                                    }
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DashboardBudget;
