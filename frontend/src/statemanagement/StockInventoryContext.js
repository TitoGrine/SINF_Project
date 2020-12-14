import React, { createContext, useState } from "react";

export const StockInventoryContext = createContext();

export const StockInventoryProvider = (props) => {
  const [quantity, setQuantity] = useState(Array(props.length));

  return (
    <StockInventoryContext.Provider value={[quantity, setQuantity]}>
      {props.children}
    </StockInventoryContext.Provider>
  );
};
