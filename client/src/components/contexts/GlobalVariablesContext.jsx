import React, { useState, createContext } from 'react';

export const GlobalVariablesContext = createContext();

export default function GlobalVariablesProvider({ children }) {
  const [months] = useState(["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"]);

  return (
    <GlobalVariablesContext.Provider value={[months]}>
        {children}
    </GlobalVariablesContext.Provider>
  );
}