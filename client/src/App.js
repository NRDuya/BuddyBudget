import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Dashboard from './components/pages/Dashboard/Dashboard';
import MainBudget from './components/pages/MainBudget/MainBudget';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';

function App() {

  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/mainbudget" component={MainBudget} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Registration} />
        </Switch>
    </Router>
  );
}

export default App;
