import { useState, useEffect, useContext, Fragment } from 'react';
import { VariableBudgetContext, IncomeBudgetContext } from '../../../contexts/MainBudgetContext';
import { ExpensesContext } from '../../../contexts/MonthlyExpensesContext';
import MainBudgetTableRow from './MainBudgetTableRow';
import MainBudgetTableTotal from './MainBudgetTableTotal';

function MainBudgetTable({ type }) {
    const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
    const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);
    const [budget, setBudget] = useState([]);

    const [expenses, setExpenses] = useContext(ExpensesContext);
    const [typeExpenses, setTypeExpenses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        switch(type) {
            case "variable":
                setBudget(variableBudget);
                break;
            case "income":
                setBudget(incomeBudget);
                break;
            default:
                break;
        }
    }, [type, variableBudget, incomeBudget]);

    useEffect(() => {
        // Remove expenses of different types
        const filteredTypeExpenses = expenses.filter((budget_) => budget.some(category => category.id === budget_.category));
        setTypeExpenses(filteredTypeExpenses);
        setLoading(false);
    }, [expenses, budget]);
    
    if(loading) return "Loading...";
    return (
        <>
            <div className='container mt-4'>    
                <h2>
                    { type } Budget
                </h2>

                <div>
                    <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                        <thead className='table-light'>
                            <tr>
                                <th>Category</th>
                                <th>Actual</th>
                                <th>Budgeted</th>
                                <th>Remaining</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {budget.map((budget_) => (
                                <Fragment key={ budget_.id }>
                                    { 
                                     <MainBudgetTableRow type={ type } budget={ budget_ } expenses={ typeExpenses } /> 
                                    }
                                </Fragment>
                            ))}
                            <MainBudgetTableTotal type={ type } expenses={ typeExpenses } />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MainBudgetTable;
