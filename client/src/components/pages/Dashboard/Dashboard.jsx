import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';
import MainBudget from '../MainBudget/MainBudget';

function Dashboard() {
    const [mainBudget, setMainBudget] = useState([]);
    const [mainIncome, setMainIncome] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    if(loading) return "Loading...";
    if(error) return "Error loading...";
    return (
        <>
            <Navbar />
            <div className='app-container'>  
            <MainBudget type={ 'variable' }/>  
            <MainBudget type={ 'fixed' }/>  
            <MainBudget type={ 'income' }/>  

            </div>
        </>
    )
}

export default Dashboard;