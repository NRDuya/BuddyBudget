import { useState, useEffect, useContext, Fragment } from 'react';
import { VariableBudgetContext, FixedBudgetContext, IncomeBudgetContext } from '../../../contexts/MainBudgetContext';
import DashboardBudgetRow from './DashboardBudgetRow';

function DashboardBudget({ type, handleBudgetClick }) {
    const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
    const [fixedBudget, setFixedBudget] = useContext(FixedBudgetContext);
    const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);
    const [budget, setBudget] = useState([]);

    useEffect(() => {
        switch(type) {
            case "variable":
              setBudget(variableBudget);
              break;
            case "fixed":
              setBudget(fixedBudget);
              break;
            case "income":
              setBudget(incomeBudget);
              break;
            default:
              break;
          }
    }, [type, variableBudget, fixedBudget, incomeBudget])

    return (
        <>
            <div className='container d-flex flex-column'>    
                <h2 className="card-header text-center">
                    { type } Budget
                </h2>
                
                <button className='btn btn-primary m-2' onClick={() => handleBudgetClick(type)}>Edit { type } Budget</button>

                <div>                
                    <table className='table table-bordered table-responsive' style={{ tableLayout: 'fixed' }}>
                        <thead className='table-light'>
                            <tr>
                                <th>Category</th>
                                <th>Set BudGet</th>
                            </tr>

                        </thead>
                        <tbody>
                            {budget.map((data) => (
                                <Fragment key={data.id}>
                                    { 
                                     <DashboardBudgetRow data={ data }/> 
                                    }
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DashboardBudget;
