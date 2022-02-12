import { useNavigate } from 'react-router-dom';
import DashboardBudget from './DashboardBudget/DashboardBudget';

function Dashboard() {
    const navigate = useNavigate();

    const handleBudgetClick = (type) => {
        navigate(`/${type}`)
    }
    
    return (
        <>
            <div className='app-container'>  
                <DashboardBudget type={ 'variable' } handleBudgetClick={ handleBudgetClick }/>  
                <DashboardBudget type={ 'fixed' } handleBudgetClick={ handleBudgetClick }/>  
                <DashboardBudget type={ 'income' } handleBudgetClick={ handleBudgetClick }/>
            </div>
        </>
    )
}

export default Dashboard;