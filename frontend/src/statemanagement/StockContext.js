import React, { createContext, useState } from "react";

export const StockContext = createContext();

export const StockProvider = (props) => {
  const [checked, setChecked] = useState([]);

  return (
    <StockContext.Provider value={[checked, setChecked]}>
      {props.children}
    </StockContext.Provider>
  );
};
