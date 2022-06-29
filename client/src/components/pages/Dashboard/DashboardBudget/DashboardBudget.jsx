import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import DashboardBudgetRow from './DashboardBudgetRow';

function DashboardBudget({ type, handleBudgetClick }) {
    const [budget, setBudget] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios(`/${type}Budget/`)
         .then((res) => {
            setBudget(res.data.budget);
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
            <div className='container d-flex flex-column'>    
                <h2 className="card-header text-center">
                    { type } Budget
                </h2>
                
                <button className='btn btn-primary m-2' onClick={() => handleBudgetClick(type)}>Edit { type } Budget</button>

                <div>                
                    <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                        <thead className='table-light'>
                            <tr>
                                <th>Category</th>
                                <th>Set BudGet</th>
                            </tr>

                        </thead>
                        <tbody>
                            {budget.map((data) => (
                                <Fragment key={data.id}>
                                    { 
                                     <DashboardBudgetRow data={ data }/> 
                                    }
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DashboardBudget;
