import { useState, useEffect } from 'react';

function MainBudgetTableRow({ budget, expenses, setExpenses }){
    const [catTotal, setCatTotal] = useState(0);
    const [remaining, setRemaining] = useState(0);
    
    useEffect(() => {
        let currentCatBudget = []
        // Removes current budget category from the parent budget array
        let filteredCatBudget = expenses.filter((budget_) => {
            if (budget_.category === budget.id) {
                currentCatBudget.push(budget_);
                return false;
            } else {
                return true;
            }
        })
        setExpenses(filteredCatBudget);

        // Calculate sum of current category expenses
        let budgetExpenses = currentCatBudget.map(budget_ => parseFloat(budget_.expense))
        let budgetSum = budgetExpenses.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
        setCatTotal(budgetSum.toFixed(2));

        setRemaining((budget.expense - catTotal).toFixed(2));
    }, [catTotal]);
    
    return(
        <>
            <tr>
                <td>{budget.category}</td>
                <td>${catTotal}</td>
                <td>${budget.expense}</td>
                <td>${remaining}</td>
            </tr> 
        </>
    )
}

export default MainBudgetTableRow;