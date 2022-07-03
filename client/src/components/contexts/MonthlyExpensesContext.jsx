import React, { useState, createContext } from 'react';

export const VariableExpensesContext = createContext();
export const IncomeExpensesContext = createContext();

export default function MonthlyExpenseProvider({ children }) {
  const [variableExpenses, setVariableExpenses] = useState([]);
  const [incomeExpenses, setIncomeExpenses] = useState([]);

  return (
    <VariableExpensesContext.Provider value={[variableExpenses, setVariableExpenses]}>
      <IncomeExpensesContext.Provider value={[incomeExpenses, setIncomeExpenses]}>
        {children}
      </IncomeExpensesContext.Provider>
    </VariableExpensesContext.Provider>
  );
}