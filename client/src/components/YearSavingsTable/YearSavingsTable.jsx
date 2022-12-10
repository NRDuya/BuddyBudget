import axios from 'axios';
import { useState, useEffect, useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalVariablesContext } from '../contexts/GlobalVariablesContext';
import MonthSavingsData from './MonthSavingsData';

function YearSavingsTable({ expensesObj }) {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const [months] = useContext(GlobalVariablesContext);

    const [expensesSummary, setExpensesSummary] = useState({
        // key month, value object
        1: {
            // key type, value total expenses for the type that month
            "var": 1000.00,
            "inc": 100.00
        }
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        if (expensesObj) {
            setExpensesSummary(expensesObj);
            setLoading(false);
        } else {
            axios.get('/api/summaryBudget/monthly-total-sum', {
                params: {
                  year: new Date().getFullYear()
                }
            })
             .then((res) => {
                if (res.data.success) {
                    let monthlySumExpenses = res.data.expenses
                    const expensesObj = {};
                    
                    monthlySumExpenses.forEach((month) => {
                        let monthValue = expensesObj[month.month];
                        if (monthValue) {
                            monthValue[month.type] = parseFloat(month.total);
                        } else {
                            const newMonth = {};
                            newMonth[month.type] = parseFloat(month.total);
    
                            expensesObj[month.month] = newMonth
                        }
                    })
    
                    setExpensesSummary(expensesObj);
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
        }
    }, [expensesObj]);

    const handleMonthClick = (month) => {
        navigate(`/budget/${currentYear}/${month}`);
    };

    const handleYearClick = () => {
        navigate(`/budget/${currentYear}`);
    };

    if(loading) return "Loading...";
    return (
        <>  
            <div className='text-center mt-2'>
                <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                    <thead className='table-light'>
                        <tr>
                            <th onClick={() => handleYearClick()} style={{cursor:'pointer'}}>
                                {currentYear}
                            </th>

                            {months.map((month, index) => (
                                <th key={month} onClick={() => handleMonthClick(index + 1)} style={{cursor:'pointer'}}>
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>Money Saved</th>
                            {months.map((month, index) => (
                                <Fragment key={month}>
                                    <MonthSavingsData expensesSummary={ expensesSummary } month={ index + 1 } />
                                </Fragment>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default YearSavingsTable;