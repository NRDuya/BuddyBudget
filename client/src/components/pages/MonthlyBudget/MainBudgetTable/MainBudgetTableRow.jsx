import { useState, useEffect } from 'react';

function MainBudgetTableRow({ type, budget, expenses }){
    const [catExpenseTotal, setCatExpenseTotal] = useState(0);
    const [remaining, setRemaining] = useState(0);
    
    useEffect(() => {
        // Removes expenses from different budget categories
        const filteredCatExpenses = expenses.filter((expense) => expense.category === budget.id )

        // Calculate sum of current category expenses
        const catSum = filteredCatExpenses.map(budget_ => parseFloat(budget_.expense))
            .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
        setCatExpenseTotal(catSum.toFixed(2));
        
        switch(type) {
            case "variable":
                setRemaining((budget.expense - catExpenseTotal).toFixed(2));
                break;
            case "income":
                setRemaining((catExpenseTotal - budget.expense).toFixed(2));
                break;
            default:
                break;
        }
    }, [type, budget, expenses, catExpenseTotal]);
    
    return(
        <>
            <tr className={remaining < 0 && 'negative'}>
                <td>{budget.category}</td>
                <td>${catExpenseTotal}</td>
                <td>${budget.expense}</td>
                <td className={remaining > 0 && 'positive'}>${remaining}</td>
            </tr> 
        </>
    )
}

export default MainBudgetTableRow;