import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navbar';
import Dashboard from './components/pages/Dashboard/Dashboard';
import IndividualBudget from './components/pages/IndividualBudget/IndividualBudget';
import MonthlyBudget from './components/pages/MonthlyBudget/MonthlyBudget';
import SummaryBudget from './components/pages/SummaryBudget/SummaryBudget';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';
import MainBudgetProvider from './components/contexts/MainBudgetContext';
import MonthlyExpenseProvider from './components/contexts/MonthlyExpensesContext';
import GlobalVariablesProvider from './components/contexts/GlobalVariablesContext';

function App() {

  return (
    <GlobalVariablesProvider>
      <MainBudgetProvider>
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
              path='/individual-budget/:type'
              element={
                <PrivateRoute>
                  <IndividualBudget />
                </PrivateRoute>
              }
              />
              <Route
              path='/budget/:year/:month'
              element={
                <MonthlyExpenseProvider>
                  <PrivateRoute>
                    <MonthlyBudget />
                  </PrivateRoute>
                </MonthlyExpenseProvider>
              }
              />
              <Route
              path='/budget/:year'
              element={
                <PrivateRoute>
                  <SummaryBudget />
                </PrivateRoute>
              }
              />
            </Routes>
        </Router>
      </MainBudgetProvider>
    </GlobalVariablesProvider>

  );
}

export default App;
