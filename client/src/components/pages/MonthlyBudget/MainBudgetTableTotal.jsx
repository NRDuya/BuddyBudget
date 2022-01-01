import { useState, useEffect } from 'react';

function MainBudgetTableTotal({ categories, budget }){
    const [totalCat, setTotalCat] = useState(0);
    const [actualTotal, setActualTotal] = useState(0);

    useEffect(() => {
        setTotalCat(categories.map(category => parseFloat(category.expense)).reduce((prev, curr) => prev + curr, 0));
        setActualTotal(budget.map(budget_ => parseFloat(budget_.expense)).reduce((prev, curr) => prev + curr, 0));
    }, [categories, budget]);

    return(
        <>
            <tr>
                <td>Total</td>
                <td>${actualTotal}</td>
                <td>${totalCat}</td>
                <td>${totalCat - actualTotal}</td>
            </tr> 
        </>
    )
}

export default MainBudgetTableTotal;