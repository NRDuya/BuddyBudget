import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import MainBudget from './MainBudget/MainBudget';
import DashboardBudget from './DashboardBudget';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
    const navigate = useNavigate();
    const [shownBudget, setShownBudget] = useState(null);

    const handleBudgetClick = (type) => {
        setShownBudget(type);
    }

    const handlExitBudgetClick = () => {
        setShownBudget(null);
    }

    const handleCalendar = (value) => {
        const link = (value.getMonth() + 1) + "/" + value.getFullYear();
        navigate(`/${link}`);
    }
    
    return (
        <>
            <Navbar />
            <div className='app-container'>  
                <Calendar maxDetail="year" prev2Label={null} next2Label={null} onChange={handleCalendar} />
                <DashboardBudget type={ 'variable' } handleBudgetClick={ handleBudgetClick }/>  
                <DashboardBudget type={ 'fixed' } handleBudgetClick={ handleBudgetClick }/>  
                <DashboardBudget type={ 'income' } handleBudgetClick={ handleBudgetClick }/>
                {shownBudget !== null && <MainBudget type={ shownBudget } handlExitBudgetClick={ handlExitBudgetClick }/>}
            </div>
        </>
    )
}

export default Dashboard;