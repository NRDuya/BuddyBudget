import { useState, useEffect } from 'react';

function MainBudgetTableTotal({ categories, totalBudget }){
    const [actualTotal, setActualTotal] = useState(0);
    const [budgetTotal, setBudgetTotal] = useState(0);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        // Calculate sum of all actual expenses
        const totalExpenses = totalBudget.map(budget_ => parseFloat(budget_.expense));
        const totalSum = totalExpenses.reduce((prev, curr) => prev + curr, 0);
        setActualTotal(totalSum.toFixed(2));
        
        // Calculate sum of expected budget of expenses
        const budgetExpenses = categories.map(category => parseFloat(category.expense));
        const budgetSum = budgetExpenses.reduce((prev, curr) => prev + curr, 0)
        setBudgetTotal(budgetSum.toFixed(2));

        setRemaining((budgetTotal - actualTotal).toFixed(2));
    }, [categories, totalBudget, budgetTotal, actualTotal]);

    return(
        <>
            <tr>
                <td>Total</td>
                <td>${actualTotal}</td>
                <td>${budgetTotal}</td>
                <td>${remaining}</td>
            </tr> 
        </>
    )
}

export default MainBudgetTableTotal;