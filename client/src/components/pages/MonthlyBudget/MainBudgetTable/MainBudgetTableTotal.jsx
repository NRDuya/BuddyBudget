import { useState, useEffect } from 'react';

function MainBudgetTableTotal({ type, budgets, expenses }){
    const [actualTotal, setActualTotal] = useState(0);
    const [budgetedTotal, setBudgetedTotal] = useState(0);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        // Calculate sum of actual expenses
        const totalSum = expenses.map(expense_ => parseFloat(expense_.expense))
            .reduce((prev, curr) => prev + curr, 0);
        setActualTotal(totalSum.toFixed(2));
        
        // Calculate sum of expected budget of expenses
        const budgetSum = budgets.map(budget_ => parseFloat(budget_.expense))
            .reduce((prev, curr) => prev + curr, 0)
        setBudgetedTotal(budgetSum.toFixed(2));

        switch(type) {
            case "variable":
                setRemaining((budgetedTotal - actualTotal).toFixed(2));
                break;
            case "income":
                setRemaining((actualTotal - budgetedTotal).toFixed(2));
                break;
            default:
                break;
        }
    }, [type, budgets, expenses, budgetedTotal, actualTotal]);

    return(
        <>
            <tr>
                <td>Total</td>
                <td>${actualTotal}</td>
                <td>${budgetedTotal}</td>
                <td>${remaining}</td>
            </tr> 
        </>
    )
}

export default MainBudgetTableTotal;