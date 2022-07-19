import { useState, useEffect, useContext } from 'react';
import { VariableTotalContext, IncomeTotalContext } from '../../../contexts/MainBudgetContext';

function MainBudgetTableTotal({ type, expenses }){
    const [variableTotal, setVariableTotal] = useContext(VariableTotalContext);
    const [incomeTotal, setIncomeTotal] = useContext(IncomeTotalContext);

    const [actualTotal, setActualTotal] = useState(0);
    const [budgetedTotal, setBudgetedTotal] = useState(0);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        // Calculate sum of actual expenses
        const totalSum = expenses.map(expense_ => parseFloat(expense_.expense))
            .reduce((prev, curr) => prev + curr, 0);
        setActualTotal(totalSum.toFixed(2));
    
        switch(type) {
            case "variable":
                setBudgetedTotal(variableTotal);
                setRemaining((budgetedTotal - actualTotal).toFixed(2));
                break;
            case "income":
                setBudgetedTotal(incomeTotal);
                setRemaining((actualTotal - budgetedTotal).toFixed(2));
                break;
            default:
                break;
        }
    }, [type, expenses, budgetedTotal, actualTotal, variableTotal, incomeTotal]);

    return(
        <>
            <tr className={remaining < 0 && 'negative'}>
                <td>Total</td>
                <td>${actualTotal}</td>
                <td>${budgetedTotal}</td>
                <td className={remaining > 0 && 'positive'}>${remaining}</td>
            </tr> 
        </>
    )
}

export default MainBudgetTableTotal;