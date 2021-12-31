import { useState, useEffect } from 'react';
import MainBudgetTableRow from './MainBudgetTableRow';
import MainBudgetTableTotal from './MainBudgetTableTotal';

function MainBudgetTable({ type, budget, allCategories }) {
    const [categories, setCategories] = useState(allCategories);

    useEffect(() => {
        setCategories(allCategories.filter((category) => category.type === type));
    }, [allCategories, type]);

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
                                <>
                                    { 
                                     <MainBudgetTableRow category={ category } budget={ budget }/> 
                                    }
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MainBudgetTable;
