import { useState, useEffect } from 'react';

function MainBudgetTableRow({ category, budget }){
    const [catBudget, setCatBudget] = useState(budget);
    const [catActual, setCatActual] = useState(0);
    
    useEffect(() => {
        setCatBudget(budget.filter((budget_) => budget_.category === category.id));
        setCatActual(catBudget.map(budget_ => parseFloat(budget_.expense)).reduce((prev, curr) => prev + curr, 0));
    }, [category, budget, catBudget]);
    
    return(
        <>
            <tr>
                <td>{category.category}</td>
                <td>${catActual}</td>
                <td>${category.expense}</td>
                <td>${category.expense - catActual}</td>
            </tr> 
        </>
    )
}

export default MainBudgetTableRow;