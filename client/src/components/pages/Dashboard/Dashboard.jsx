import { useNavigate } from 'react-router-dom';
import DashboardBudget from './DashboardBudget/DashboardBudget';

function Dashboard() {
    const navigate = useNavigate();

    const handleBudgetClick = (type) => {
        navigate(`/${type}`)
    }
    
    return (
        <>
            <div className='container d-flex' style={{ maxWidth: '100%' }}>  
                <div className="card w-100 m-2">
                    <div className="card-body">
                        <DashboardBudget type={ 'variable' } handleBudgetClick={ handleBudgetClick }/>  
                    </div>
                </div>
    
                <div className="card w-100 m-2">
                    <div className="card-body">
                        <DashboardBudget type={ 'fixed' } handleBudgetClick={ handleBudgetClick }/>  
                    </div>
                </div>

                <div className="card w-100 m-2">
                    <div className="card-body">
                        <DashboardBudget type={ 'income' } handleBudgetClick={ handleBudgetClick }/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;