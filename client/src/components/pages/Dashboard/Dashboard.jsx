import { useState } from 'react';
import Navbar from '../../Navbar';
import MainBudget from './MainBudget/MainBudget';
import DashboardBudget from './DashboardBudget';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
    const [shownBudget, setShownBudget] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleBudgetClick = (type) => {
        setShownBudget(type);
    }

    const handlExitBudgetClick = () => {
        setShownBudget(null);
    }

    const handleCalendar = (value) => {
        const month = value.getMonth();
        const year = value.getYear();
        console.log(month + ' ' + year)
        console.log(value);
        setDate(value);
    }
    
    return (
        <>
            <Navbar />
            {/* <input type="date" id="startDate" name="startDate" ></input> */}
            <Calendar maxDetail="year" prev2Label={null} next2Label={null} onChange={handleCalendar} />
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