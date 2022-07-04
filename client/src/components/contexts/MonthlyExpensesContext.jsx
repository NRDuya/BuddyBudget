import React, { useState, createContext } from 'react';

export const ExpensesContext = createContext();

export default function MonthlyExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  return (
    <ExpensesContext.Provider value={[expenses, setExpenses]}>
        {children}
    </ExpensesContext.Provider>
  );
}