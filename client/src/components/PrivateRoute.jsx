import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { VariableBudgetContext, FixedBudgetContext, IncomeBudgetContext } from './contexts/MainBudgetContext';

function PrivateRoute({ children }) {
  const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
  const [fixedBudget, setFixedBudget] = useContext(FixedBudgetContext);
  const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios.get('/users/verify')
      .then((res) => {
        setAuth(res.data.success);
        return axios.get('/mainBudget/');
      })
      .then((res) => {
        if (res.data.success) {
          const varBudget = [];
          const fixBudget = [];
          const incBudget = [];
  
          const budgets = res.data.budgets;
  
          budgets.forEach((budget) => {
            switch(budget.type) {
              case "var":
                varBudget.push(budget);
                break;
              case "fix":
                fixBudget.push(budget);
                break;
              case "inc":
                incBudget.push(budget);
                break;
              default:
                break;
            }
          });

          setVariableBudget(varBudget);
          setFixedBudget(fixBudget);
          setIncomeBudget(incBudget);
        } else {
          // set alert
        }
      })
      .catch((err) => {
        //set alert
        console.error("Error fetching data", err);
      })
      .finally(() => {
          setLoading(false);
      })
  }, [])

  if(loading) return "Loading...";
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;