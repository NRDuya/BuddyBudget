import React, { useState, createContext } from 'react';

export const VariableBudgetContext = createContext();
export const FixedBudgetContext = createContext();
export const IncomeBudgetContext = createContext();

export default function MainBudgetProvider({ children }) {
  const [variableBudget, setVariableBudget] = useState([]);
  const [fixedBudget, setFixedBudget] = useState([]);
  const [incomeBudget, setIncomeBudget] = useState([]);

  
  return (
    <VariableBudgetContext.Provider value={[variableBudget, setVariableBudget]}>
      <FixedBudgetContext.Provider value={[fixedBudget, setFixedBudget]}>
        <IncomeBudgetContext.Provider value={[incomeBudget, setIncomeBudget]}>
          {children}
        </IncomeBudgetContext.Provider>
      </FixedBudgetContext.Provider>
    </VariableBudgetContext.Provider>

  );
}