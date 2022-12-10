import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { VariableBudgetContext, FixedBudgetContext, IncomeBudgetContext, 
  VariableTotalContext, FixedTotalContext, IncomeTotalContext } from './contexts/MainBudgetContext';

function PrivateRoute({ children }) {
  const [variableBudget, setVariableBudget] = useContext(VariableBudgetContext);
  const [fixedBudget, setFixedBudget] = useContext(FixedBudgetContext);
  const [incomeBudget, setIncomeBudget] = useContext(IncomeBudgetContext);

  const [variableTotal, setVariableTotal] = useContext(VariableTotalContext);
  const [fixedTotal, setFixedTotal] = useContext(FixedTotalContext);
  const [incomeTotal, setIncomeTotal] = useContext(IncomeTotalContext);  

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios.get('/api/users/verify')
      .then((res) => {
        setAuth(res.data.success);
        if (!res.data.success) {
          return res.data.success;
        }
        return axios.get('/api/mainBudget/');
      })
      .then((res) => {
        if (res.data.success) {
          const varBudget = [];
          const fixBudget = [];
          const incBudget = [];
          let varTotal = 0;
          let fixTotal = 0;
          let incTotal = 0;
  
          const budgets = res.data.budgets;
  
          budgets.forEach((budget) => {
            switch(budget.type) {
              case "var":
                varBudget.push(budget);
                varTotal = varTotal + parseFloat(budget.expense);
                break;
              case "fix":
                fixBudget.push(budget);
                fixTotal = fixTotal + parseFloat(budget.expense);
                break;
              case "inc":
                incBudget.push(budget);
                incTotal = incTotal + parseFloat(budget.expense);
                break;
              default:
                break;
            }
          });

          setVariableBudget(varBudget);
          setVariableTotal(parseFloat(varTotal.toFixed(2)));
          setFixedBudget(fixBudget);
          setFixedTotal(parseFloat(fixTotal.toFixed(2)));
          setIncomeBudget(incBudget);
          setIncomeTotal(parseFloat(incTotal.toFixed(2)));
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