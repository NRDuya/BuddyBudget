import { useState, useEffect, useContext } from 'react';
import { FixedTotalContext } from '../../../contexts/MainBudgetContext';

function YearSummaryData({ expensesSummary, month }) {
    const [fixedTotal, setFixedTotal] = useContext(FixedTotalContext);

    const [moneySaved, setMoneySaved] = useState(0);

    useEffect(() => {
        const monthExpenses = expensesSummary[month];
        console.log(monthExpenses);
        if (monthExpenses) {
            const variableExpenses = expensesSummary[month].var;
            const incomeExpenses = expensesSummary[month].inc;
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

export default YearSummaryData;