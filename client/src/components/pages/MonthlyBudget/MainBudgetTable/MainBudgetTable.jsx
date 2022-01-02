import { useState, useEffect, Fragment } from 'react';
import MainBudgetTableRow from './MainBudgetTableRow';
import MainBudgetTableTotal from './MainBudgetTableTotal';

function MainBudgetTable({ type, allBudget, allCategories }) {
    const [categories, setCategories] = useState(allCategories);
    const [budget, setBudget] = useState(allBudget);

    useEffect(() => {
        setCategories(allCategories.filter((category) => category.type === type));
    }, [allCategories, type]);

    useEffect(() => {
        setBudget(allBudget.filter((budget_) => categories.some(category => category.id === budget_.category)))
    }, [allBudget, categories]);
    
    return (
        <>
            <div className='app-container'>    
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
                                     <MainBudgetTableRow category={ category } budget={ budget }/> 
                                    }
                                </Fragment>
                            ))}
                            <MainBudgetTableTotal categories={ categories } budget={ budget }/>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MainBudgetTable;
