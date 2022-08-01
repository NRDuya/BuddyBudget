import { useState, useEffect } from 'react';

function SummaryBudgetTableData({ expenses, month }) {
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        let currentExpense = expenses[month];
        if (!currentExpense) currentExpense = 0;
        setExpense(currentExpense.toFixed(2));
    }, [expenses, month]);

    return(
        <>
            <td>
                ${expense}
            </td>
        </>
    )
}

export default SummaryBudgetTableData;