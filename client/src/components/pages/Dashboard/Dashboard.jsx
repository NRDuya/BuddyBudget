import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';

function Dashboard() {
    const [mainBudget, setMainBudget] = useState([]);
    const [mainIncome, setMainIncome] = useState([]);
    
    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <Navbar />
            <div className='app-container'>    
            
            </div>
        </>
    )
}

export default Dashboard;