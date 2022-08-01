import { useState, useEffect, useContext, Fragment } from 'react';
import { GlobalVariablesContext } from '../../../contexts/GlobalVariablesContext';
import SummaryBudgetTableData from './SummaryBudgetTableData';

function SummaryBudgetTableRow({ budget, expenses }) {
    const [months] = useContext(GlobalVariablesContext);
    const [budgetExpenses, setBudgetExpenses] = useState({});
    const [totalYearSpent, setTotalYearSpent] = useState(0);

    useEffect(() => {
        let budgetExpenses = expenses[budget.id];
        if (!budgetExpenses) budgetExpenses = {};
        setBudgetExpenses(budgetExpenses);
    
        let budgetTotalExpenses = budgetExpenses.total;
        if (!budgetTotalExpenses) budgetTotalExpenses = 0;
        setTotalYearSpent(budgetTotalExpenses.toFixed(2));    
    }, [budget, expenses]);

    return (
        <>
            <tr>
                <th>
                    {budget.category}
                </th>

                <td>
                    ${budget.expense}
                </td>

                {months.map((month, index) => (
                    <Fragment key={month}>
                        <SummaryBudgetTableData expenses={ budgetExpenses } month={ index + 1 } />
                    </Fragment>
                ))}

                <td>
                    ${totalYearSpent}
                </td>
            </tr>
        </>
    )
}

export default SummaryBudgetTableRow;