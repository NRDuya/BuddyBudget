import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SummaryBudgetTable from './SummaryBudgetTable/SummaryBudgetTable';
import YearSavingsTable from '../../YearSavingsTable/YearSavingsTable';

function SummaryBudget() {
    const { year } = useParams();
    
    const [expenses, setExpenses] = useState({
        // key budget/category id, value object
        99: {
            // key month, value expense for month
            1: 100.00,
            3: 400.00,
            // key total, value sum of the year's expenses for the category
            "total": 500.00
        }
    });
    const [monthlyTotal, setMonthlyTotal] = useState({
        // key month, value object
        1: {
            // key type, value total expenses for the type that month
            "var": 1000.00,
            "inc": 100.00
        },
        // key type, value total expenses for the type for the year
        "var": 1000.00,
        "inc": 100.00
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.get('/summaryBudget/monthly-expenses-sum', {
            params: {
              year: year
            }
        })
         .then((res) => {
            if (res.data.success) {
                let categoryExpenses = res.data.expenses
                // holds the total of one category each month
                const expensesObj = {};
                // holds the total of all categories each month
                const monthlyTotalObj = {};

                categoryExpenses.forEach((category) => {
                    // Populate expensesObj
                    let categoryObj = expensesObj[category.category];
                    if (categoryObj) {
                        categoryObj[category.month] = parseFloat(category.total);

                        const oldTotal = categoryObj.total;
                        const newTotal = parseFloat(oldTotal) + parseFloat(category.total);
                        categoryObj.total = parseFloat(newTotal.toFixed(2));
                    } else {
                        const newCategory = {};
                        newCategory[category.month] = parseFloat(category.total);
                        newCategory.total = parseFloat(category.total);

                        expensesObj[category.category] = newCategory
                    }

                    // Populate monthlyTotalObj
                    let monthValue = monthlyTotalObj[category.month];
                    if (monthValue) {
                        let oldTotal = monthValue[category.type];
                        if (!oldTotal) oldTotal = 0;
                        
                        const newTotal = parseFloat(category.total) + parseFloat(oldTotal);
                        monthValue[category.type] = parseFloat(newTotal.toFixed(2));
                    } else {
                        const newMonth = {};
                        newMonth[category.type] = parseFloat(category.total);

                        monthlyTotalObj[category.month] = newMonth;
                    }

                    const oldTypeTotal =  monthlyTotalObj[category.type];
                    if (oldTypeTotal) {
                        const newTotal = parseFloat(category.total) + parseFloat(oldTypeTotal);
                        monthlyTotalObj[category.type] = parseFloat(newTotal.toFixed(2));
                    } else {
                        monthlyTotalObj[category.type] = parseFloat(category.total);
                    }
                })

                setExpenses(expensesObj);
                setMonthlyTotal(monthlyTotalObj);
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
    }, [year]);

    if(loading) return "Loading...";
    return (
        <>
            <div className='container mt-3'>
                <YearSavingsTable expensesObj={ monthlyTotal } />
                <SummaryBudgetTable expenses={ expenses } monthlyTotal={ monthlyTotal } type={ "var" } />
                <SummaryBudgetTable expenses={ expenses } monthlyTotal={ monthlyTotal } type={ "inc" } />
            </div>
        </>
    )
}

export default SummaryBudget;