import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MainBudgetTable from './MainBudgetTable/MainBudgetTable';
import MonthlyBudgetTable from './MonthlyBudgetTable/MonthlyBudgetTable';

function Budget() {
    const { month, year } = useParams();
    const [budget, setBudget] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get('/monthlyBudget/', {
            params: {
              month: month,
              year: year
            }
        })
         .then((res) => {
            if (res.data.success) {
                setCategories(res.data.categories);
                setBudget(res.data.budget);
            }
            else {
                
            }
         })
         .catch((err) => {
            console.error("Error fetching data", err);
            setError(err);
         })
         .finally(() => {
            setLoading(false);
         })
    }, [month, year])

    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <div className='app-container'>    
                <h2>
                    {month} {year} Budget
                </h2>
                <MonthlyBudgetTable budget={ budget } categories={ categories }/>
                <MainBudgetTable type={ 'var' } allBudget={ budget } allCategories={ categories }/>
                <MainBudgetTable type={ 'inc' } allBudget={ budget } allCategories={ categories }/>
                {/*
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
                            {budget.map((data) => (
                                <>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </>
    )
}

export default Budget;
