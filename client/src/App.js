import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './components/pages/Dashboard/Dashboard';
import MainBudget from './components/pages/Dashboard/MainBudget/MainBudget';
import Budget from './components/pages/MonthlyBudget/Budget';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Registration />} />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
           path='/:type'
           element={
             <PrivateRoute>
               <MainBudget />
             </PrivateRoute>
           }
          />
          <Route
           path='/:year/:month'
           element={
             <PrivateRoute>
               <Budget />
             </PrivateRoute>
           }
          />
        </Routes>
    </Router>
  );
}

export default App;
