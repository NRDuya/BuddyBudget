import { useState, useEffect } from 'react';

function SummaryBudgetTableData({ highlight, month, type, budgetTotal, expenses }) {
    const [expense, setExpense] = useState(0);
    const [color, setColor] = useState();

    useEffect(() => {
        let currentExpense = expenses[month];
        if (!currentExpense) currentExpense = 0;
        setExpense(currentExpense.toFixed(2));

        if (highlight) {
            if (type === 'var') {
                if (budgetTotal < expense && parseFloat(expense) !== 0) {
                    setColor('negative');
                } else if (budgetTotal >= expense && parseFloat(expense) !== 0) {
                    setColor('positive');
                }
            } else if (type === 'inc') {
                if (budgetTotal > expense && parseFloat(expense) !== 0) {
                    setColor('negative');
                } else if (budgetTotal <= expense && parseFloat(expense) !== 0) {
                    setColor('positive');
                }
            }
        } else {
            setColor();
        }
    }, [highlight, month, type, budgetTotal, expenses]);

    return(
        <>
            <td className={color}>
                ${expense}
            </td>
        </>
    )
}

export default SummaryBudgetTableData;