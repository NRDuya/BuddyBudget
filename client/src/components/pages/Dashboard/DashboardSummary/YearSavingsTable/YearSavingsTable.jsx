import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import MonthSavingsData from './MonthSavingsData';

function YearSavingsTable() {
    const navigate = useNavigate();
    const months = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"]
    const currentYear = new Date().getFullYear();

    const [expensesSummary, setExpensesSummary] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get('/summaryBudget/sum', {
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
    }, []);

    const handleMonthClick = (month) => {
        navigate(`/${currentYear}/${month}`)
    }

    if(loading) return "Loading...";
    return (
        <>  
            <div className='text-center mt-2'>
            <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                        <thead className='table-light'>
                            <tr>
                                <th>{currentYear}</th>
                                {months.map((month, index) => (
                                    <th onClick={() => handleMonthClick(index + 1)} style={{cursor:'pointer'}}>
                                        {month}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th>Money Saved</th>
                                {months.map((month, index) => (
                                    <Fragment key={index}>
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