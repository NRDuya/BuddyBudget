import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Dashboard from './components/pages/Dashboard/Dashboard';
import MainBudget from './components/pages/Dashboard/MainBudget/MainBudget';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
        <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Registration />} />
        </Routes>
    </Router>
  );
}

export default App;
