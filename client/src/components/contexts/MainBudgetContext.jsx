import React, { useState, createContext } from 'react';

export const VariableBudgetContext = createContext();
export const FixedBudgetContext = createContext();
export const IncomeBudgetContext = createContext();

export const VariableTotalContext = createContext();
export const FixedTotalContext = createContext();
export const IncomeTotalContext = createContext();

export default function MainBudgetProvider({ children }) {
  const [variableBudget, setVariableBudget] = useState([]);
  const [fixedBudget, setFixedBudget] = useState([]);
  const [incomeBudget, setIncomeBudget] = useState([]);
  
  const [variableTotal, setVariableTotal] = useState(0);
  const [fixedTotal, setFixedTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);

  return (
    <VariableBudgetContext.Provider value={[variableBudget, setVariableBudget]}>
      <FixedBudgetContext.Provider value={[fixedBudget, setFixedBudget]}>
        <IncomeBudgetContext.Provider value={[incomeBudget, setIncomeBudget]}>

          <VariableTotalContext.Provider value={[variableTotal, setVariableTotal]}>
            <FixedTotalContext.Provider value={[fixedTotal, setFixedTotal]}>
              <IncomeTotalContext.Provider value={[incomeTotal, setIncomeTotal]}>
                {children}
              </IncomeTotalContext.Provider>
            </FixedTotalContext.Provider>
          </VariableTotalContext.Provider>
          
        </IncomeBudgetContext.Provider>
      </FixedBudgetContext.Provider>
    </VariableBudgetContext.Provider>

  );
}