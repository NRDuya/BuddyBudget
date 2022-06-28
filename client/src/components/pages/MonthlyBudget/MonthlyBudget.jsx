import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MainBudgetTable from './MainBudgetTable/MainBudgetTable';
import MonthlyExpensesTable from './MonthlyExpensesTable/MonthlyExpensesTable';

function MonthlyBudget() {
    const { month, year } = useParams();
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState([]);

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
                setBudget(res.data.categories);
                setExpenses(res.data.budget);
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
            <div className='container'>    
                <h2>
                    {month} {year} Budget
                </h2>
                <MonthlyExpensesTable expenses={ expenses } budget={ budget } setExpenses={ setExpenses }/>
                <MainBudgetTable type={ 'var' } allExpenses={ expenses } allBudget={ budget }/>
                <MainBudgetTable type={ 'inc' } allExpenses={ expenses } allBudget={ budget }/>
            </div>
        </>
    )
}

export default MonthlyBudget;
