import React, { createContext, useContext } from "react";

export const AuthenticationContext = createContext();

export function useAuth() {
  return useContext(AuthenticationContext);
}

export const AuthenticationProvider = (props) => {

  return (
    <AuthenticationContext.Provider value={props.value}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
