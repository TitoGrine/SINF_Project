import React, { useState, createContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = (props) => {
  const [token, setToken] = useState("");

  //test
  console.log(token)

  return (
    <AuthenticationContext.Provider value={[token, setToken]}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
