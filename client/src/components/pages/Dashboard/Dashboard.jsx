import { useState } from 'react';
import Navbar from '../../Navbar';
import MainBudget from './MainBudget/MainBudget';
import DashboardBudget from './DashboardBudget';

function Dashboard() {
    const [shownBudget, setShownBudget] = useState(null);
    
    const handleBudgetClick = (type) => {
        setShownBudget(type);
    }

    const handlExitBudgetClick = () => {
        setShownBudget(null);
    }
    
    return (
        <>
            <Navbar />
            <div className='app-container'>  
                <DashboardBudget type={ 'variable' } handleBudgetClick={ handleBudgetClick }/>  
                <DashboardBudget type={ 'fixed' } handleBudgetClick={ handleBudgetClick }/>  
                <DashboardBudget type={ 'income' } handleBudgetClick={ handleBudgetClick }/>
                {shownBudget !== null && <MainBudget type={ shownBudget } handlExitBudgetClick={ handlExitBudgetClick }/>}
            </div>
        </>
    )
}

export default Dashboard;