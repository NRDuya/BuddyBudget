import { useState, useEffect } from 'react';

function SummaryBudgetTableTotalData({ type, month, budget, monthlyTotal }) {
    const [total, setTotal] = useState(0);
    const [color, setColor] = useState();

    useEffect(() => {
        const currentMonth = monthlyTotal[month];
        if (currentMonth) {
            const totalTypeExpense = currentMonth[type];
            if (totalTypeExpense) setTotal(currentMonth[type]);
        }

        if (type === 'var') {
            if (budget < total && total !== 0) {
                setColor('negative');
            } else if (budget >= total && total !== 0) {
                setColor('positive');
            }
        } else if (type === 'inc') {
            if (budget > total && total !== 0) {
                setColor('negative');
            } else if (budget <= total && total !== 0) {
                setColor('positive');
            }
        }
    }, [monthlyTotal, month, type, budget]);

    return(
        <>
            <td className={color}>
                ${total}
            </td>
        </>
    )
}

export default SummaryBudgetTableTotalData;