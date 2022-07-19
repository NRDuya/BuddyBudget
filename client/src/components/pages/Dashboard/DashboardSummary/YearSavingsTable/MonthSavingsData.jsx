import { useState, useEffect, useContext } from 'react';
import { FixedTotalContext } from '../../../../contexts/MainBudgetContext';

function MonthSavingsData({ expensesSummary, month }) {
    const [fixedTotal, setFixedTotal] = useContext(FixedTotalContext);

    const [moneySaved, setMoneySaved] = useState(0);

    useEffect(() => {
        const monthExpenses = expensesSummary[month];

        if (monthExpenses) {
            let variableExpenses = expensesSummary[month].var;
            if (!variableExpenses) variableExpenses = 0;
            
            let incomeExpenses = expensesSummary[month].inc;
            if (!incomeExpenses) incomeExpenses = 0;

            const saved = incomeExpenses - (variableExpenses + fixedTotal)
            setMoneySaved(saved.toFixed(2));
        } else {
            setMoneySaved(0);
        }

    }, [expensesSummary, month, fixedTotal])

    return(
        <>
            <td className={moneySaved < 0 ? 'negative' : 'positive'}>
                ${moneySaved}
            </td>
        </>
    )
}

export default MonthSavingsData;