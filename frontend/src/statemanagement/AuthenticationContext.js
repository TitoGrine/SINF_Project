import React, { createContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = (props) => {

  return (
    <AuthenticationContext.Provider value={[]}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
