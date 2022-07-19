import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import YearSummaryData from './YearSummaryData';

function YearSummaryTable() {
    const rowData = Array.from(Array(12)).map((e,i)=>i+1);

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
                let expensesTotal = res.data.expenses
                const expensesObj = {};
                
                expensesTotal.forEach((month) => {
                    let monthKey = expensesObj[month.month];
                    if (monthKey) {
                        monthKey[month.type] = parseFloat(month.total);
                    } else {
                        const temp = {};
                        temp[month.type] = parseFloat(month.total);

                        expensesObj[month.month] = temp
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
         console.log("loop")
    }, []);

    if(loading) return "Loading...";
    return (
        <>  
            <div className='text-center mt-2'>
            <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                        <thead className='table-light'>
                            <tr>
                                <th>{new Date().getFullYear()}</th>
                                <th>January</th>
                                <th>February</th>
                                <th>March</th>
                                <th>April</th>
                                <th>May</th>
                                <th>June</th>
                                <th>July</th>
                                <th>August</th>
                                <th>September</th>
                                <th>October</th>
                                <th>November</th>
                                <th>December</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th>Money Saved</th>
                                {rowData.map((month) => (
                                    <Fragment key={month}>
                                        <YearSummaryData expensesSummary={ expensesSummary } month={ month } />
                                    </Fragment>
                                ))}
                            </tr>
                        </tbody>
                    </table>
            </div>
        </>
    )
}

export default YearSummaryTable;