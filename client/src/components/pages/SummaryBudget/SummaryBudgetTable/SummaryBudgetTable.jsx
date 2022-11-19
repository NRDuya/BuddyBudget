import { useState, useEffect, useContext, Fragment } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VariableBudgetContext, IncomeBudgetContext } from '../../../contexts/MainBudgetContext';
import { GlobalVariablesContext } from '../../../contexts/GlobalVariablesContext';
import SummaryBudgetTableRow from './SummaryBudgetTableRow';
import SummaryBudgetTableTotal from './SummaryBudgetTableTotal';

function SummaryBudgetTable({ expenses, monthlyTotal, type }) {
    const navigate = useNavigate();
    const { year } = useParams();

    const [months] = useContext(GlobalVariablesContext);
    
    const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
    const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);

    const [budget, setBudget] = useState([]);

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
    }, [type, variableBudget, incomeBudget]);

    const handleMonthClick = (month) => {
        navigate(`/budget/${year}/${month}`);
    };

    const handleYearClick = () => {
        navigate(`/budget/${year}`);
    };

    return (
        <>
            <div className='text-center mt-2'>
                <table className='table table-bordered table-responsive'>
                    <thead className='table-light'>
                        <tr>
                            <th onClick={() => handleYearClick()} style={{cursor:'pointer'}}>
                                {year}
                            </th>
                            
                            <th>
                                Expected Budget
                            </th>

                            {months.map((month, index) => (
                                <th key={index} onClick={() => handleMonthClick(index + 1)} style={{cursor:'pointer'}}>
                                    {month}
                                </th>
                            ))}
                            
                            <th>
                                Year Total
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {budget.map((budget_) => (
                            <Fragment key={ budget_.id }>
                                { 
                                <SummaryBudgetTableRow budget={ budget_ } expenses={ expenses } /> 
                                }
                            </Fragment>
                        ))}
                        <SummaryBudgetTableTotal type={ type } monthlyTotal={ monthlyTotal } />
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SummaryBudgetTable;