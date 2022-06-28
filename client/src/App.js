import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navbar';
import Dashboard from './components/pages/Dashboard/Dashboard';
import IndividualBudget from './components/pages/IndividualBudget/IndividualBudget';
import MonthlyBudget from './components/pages/MonthlyBudget/MonthlyBudget';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
        <Navigation />
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
               <IndividualBudget />
             </PrivateRoute>
           }
          />
          <Route
           path='/:year/:month'
           element={
             <PrivateRoute>
               <MonthlyBudget />
             </PrivateRoute>
           }
          />
        </Routes>
    </Router>
  );
}

export default App;
