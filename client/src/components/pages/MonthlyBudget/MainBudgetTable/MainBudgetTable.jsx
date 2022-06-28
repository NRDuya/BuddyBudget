import { useState, useEffect, Fragment } from 'react';
import MainBudgetTableRow from './MainBudgetTableRow';
import MainBudgetTableTotal from './MainBudgetTableTotal';

function MainBudgetTable({ type, allExpenses, allBudget }) {
    // Holds all budget for the current type
    const [budget, setBudget] = useState(allBudget);
    // Holds all the expenses for the current type
    const [totalExpenses, setTotalExpenses] = useState([]);
    // Holds the filtered expenses used by each row
    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Remove budget that are different types
        setBudget(allBudget.filter(budget => budget.type === type));
    }, [allBudget, type]);

    useEffect(() => {
        // Remove expenses of different types
        const filteredExpenses = allExpenses.filter((budget_) => budget.some(category => category.id === budget_.category));
        setExpenses(filteredExpenses);
        setTotalExpenses(filteredExpenses);
        setLoading(false);
    }, [allExpenses, budget]);
    
    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <div className='container'>    
                <h2>
                    { type } Budget
                </h2>
                <div>
                    <table>
                        <thead>
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
                                     <MainBudgetTableRow budget={ budget_ } expenses={ expenses } setExpenses={ setExpenses }/> 
                                    }
                                </Fragment>
                            ))}
                            <MainBudgetTableTotal budget={ budget } allExpenses={ totalExpenses }/>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MainBudgetTable;
