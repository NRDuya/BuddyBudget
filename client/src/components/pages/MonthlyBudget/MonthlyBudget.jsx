import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { ExpensesContext } from '../../contexts/MonthlyExpensesContext';
import MainBudgetTable from './MainBudgetTable/MainBudgetTable';
import MonthlyExpensesTable from './MonthlyExpensesTable/MonthlyExpensesTable';

function MonthlyBudget() {
    const { month, year } = useParams();

    const [expenses, setExpenses] = useContext(ExpensesContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get('/api/monthlyBudget/', {
            params: {
              month: month,
              year: year
            }
        })
         .then((res) => {
            if (res.data.success) {
                setExpenses(res.data.budget);
            }
            else {
                // set alert
            }
         })
         .catch((err) => {
            // set alert
            console.error("Error fetching data", err);
         })
         .finally(() => {
            setLoading(false);
         })
    }, [month, year])

    if(loading) return "Loading...";
    return (
        <>
            <div className='container' style={{ maxWidth: '100%' }}>    
                <h2 className='text-center mt-2'>
                    {month} {year} Budget
                </h2>

                <div className='d-flex'>
                    <MonthlyExpensesTable />

                    <div>                        
                        <MainBudgetTable type={ 'variable' } />
                        <MainBudgetTable type={ 'income' } />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MonthlyBudget;
