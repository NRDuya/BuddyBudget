import { useState, useEffect, Fragment } from 'react';
import MainBudgetTableRow from './MainBudgetTableRow';
import MainBudgetTableTotal from './MainBudgetTableTotal';

function MainBudgetTable({ type, allBudget, allCategories }) {
    // Holds all categories for the current type
    const [categories, setCategories] = useState(allCategories);
    // Holds all the budgets for the current type
    const [totalBudget, setTotalBudget] = useState([]);
    // Holds the filtered budgets used by each row
    const [budgets, setBudget] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Remove categories that are different types
        setCategories(allCategories.filter((category) => category.type === type));
    }, [allCategories, type]);

    useEffect(() => {
        // Remove budgets of different types
        const filteredBudget = allBudget.filter((budget_) => categories.some(category => category.id === budget_.category));
        setBudget(filteredBudget);
        setTotalBudget(filteredBudget);
        setLoading(false);
    }, [allBudget, categories]);
    
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
                            {categories.map((category) => (
                                <Fragment key={ category.id }>
                                    { 
                                     <MainBudgetTableRow category={ category } budget={ budgets } setBudget={ setBudget }/> 
                                    }
                                </Fragment>
                            ))}
                            <MainBudgetTableTotal categories={ categories } totalBudget={ totalBudget }/>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MainBudgetTable;
