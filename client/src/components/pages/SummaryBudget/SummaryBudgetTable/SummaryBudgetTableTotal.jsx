import { useState, useEffect, useContext, Fragment } from 'react';
import { GlobalVariablesContext } from '../../../contexts/GlobalVariablesContext';
import { VariableTotalContext, IncomeTotalContext  } from '../../../contexts/MainBudgetContext';
import SummaryBudgetTableTotalData from './SummaryBudgetTableTotalData';

function SummaryBudgetTableTotal({ monthlyTotal, type }) {
    const [months] = useContext(GlobalVariablesContext);
    const [variableBudget, setVariableBudget] = useContext(VariableTotalContext);
    const [incomeBudget, setIncomeBudget] = useContext(IncomeTotalContext);

    const [budget, setBudget] = useState(0);
    const [totalYearSpent, setTotalYearSpent] = useState(0);

    useEffect(() => {
        switch(type) {
            case "var":
                setBudget(variableBudget);
                break;
            case "inc":
                setBudget(incomeBudget);
                break;
            default:
                break;
        }

        let yearTotalExpenses = monthlyTotal[type];
        if (!yearTotalExpenses) yearTotalExpenses = 0;
        setTotalYearSpent(yearTotalExpenses.toFixed(2));
    }, [type, monthlyTotal, variableBudget, incomeBudget]);
    
    return (
        <>
            <tr>
                <th>
                    Total
                </th>

                <td>
                    ${budget}
                </td>

                {months.map((month, index) => (
                    <Fragment key={month}>
                        <td>
                            <SummaryBudgetTableTotalData type={ type } month={ index + 1 } budget={ budget } monthlyTotal={ monthlyTotal } />
                        </td>
                    </Fragment>
                ))}

                <td>
                    ${totalYearSpent}
                </td>
            </tr>
        </>
    )
}

export default SummaryBudgetTableTotal;