import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function SummaryBudget() {
    const navigate = useNavigate();
    const { year } = useParams();
    const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"]
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get('/summaryBudget/year-expenses', {
            params: {
              year: year
            }
        })
         .then((res) => {
            if (res.data.success) {
                let categoryExpenses = res.data.expenses
                const expensesObj = {};
                
                categoryExpenses.forEach((category) => {
                    let categoryObj = expensesObj[category.category];
                    if (categoryObj) {
                        categoryObj[category.month] = parseFloat(category.total);
                    } else {
                        const newCategory = {};
                        newCategory[category.month] = parseFloat(category.total);

                        expensesObj[category.category] = newCategory
                    }
                })
                console.log(expensesObj);
                // setExpensesSummary(expensesObj);
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
    }, [])

    const handleMonthClick = (month) => {
        navigate(`/budget/${year}/${month}`);
    };

    const handleYearClick = () => {
        navigate(`/budget/${year}`);
    };

    return (
        <>
          <div className='text-center mt-2'>
                <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                    <thead className='table-light'>
                        <tr>
                            <th onClick={() => handleYearClick()} style={{cursor:'pointer'}}>
                                {year}
                            </th>

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
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SummaryBudget;