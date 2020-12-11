import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = (props) => {
  const [rowsSelected, setrowsSelected] = useState([]);

  return (
    <OrderContext.Provider value={[rowsSelected, setrowsSelected]}>
      {props.children}
    </OrderContext.Provider>
  );
};
