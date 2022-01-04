import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import DashboardBudget from './DashboardBudget/DashboardBudget';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
    const navigate = useNavigate();

    const handleBudgetClick = (type) => {
        navigate(`/${type}`)
    }

    const handleCalendar = (value) => {
        const link = value.getFullYear() + "/" + (value.getMonth() + 1);
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
            </div>
        </>
    )
}

export default Dashboard;