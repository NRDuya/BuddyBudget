import React, { useState, createContext } from 'react';

const initialIncome = {};

export const IncomeContext = createContext();

export default function UserProvider({ children }) {
  const [income, setIncome] = useState(initialIncome);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <IncomeContext.Provider value={[income, setIncome]}>{children}</IncomeContext.Provider>
  );
}