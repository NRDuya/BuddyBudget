import { useState, useEffect, useContext, Fragment } from 'react';
import { VariableTotalContext, FixedTotalContext, IncomeTotalContext } from '../../../contexts/MainBudgetContext';
import YearSummaryTable from './YearSummaryTable';

function SummaryBudget() {
    const [variableTotal, setVariableTotal] = useContext(VariableTotalContext);
    const [fixedTotal, setFixedTotal] = useContext(FixedTotalContext);
    const [incomeTotal, setIncomeTotal] = useContext(IncomeTotalContext);
    
    const [moneyLeft, setMoneyLeft] = useState(0);

    useEffect(() => {
        const left = incomeTotal - (variableTotal + fixedTotal)
        setMoneyLeft(left.toFixed(2));
    }, [variableTotal, fixedTotal, incomeTotal]);

    return (
        <>  
            <div className='text-center mt-2'>
                <YearSummaryTable />
                <div className={moneyLeft < 0 ? 'negative' : 'positive'}>
                    ${moneyLeft} left to budget
                </div>
            </div>
        </>
    )
}

export default SummaryBudget;