import React from "react";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./views/LoginPage.js";
import HomePage from "./views/HomePage.js";
import BasePage from "./views/BasePage.js";

import { AuthenticationProvider } from "./statemanagement/AuthenticationContext";
import PrivateRoute from "./statemanagement/PrivateRoute";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  console.log("Tokens: ");
  console.log(existingTokens);

  return (
    <main>
      <AuthenticationProvider value={{ authTokens, setAuthTokens: setTokens }}>
        <Switch>
          <Route path="/login" exact>
            <LoginPage></LoginPage>
          </Route>
          <PrivateRoute path="/" exact>
            <HomePage></HomePage>
          </PrivateRoute>
          <PrivateRoute path="/client-orders" exact>
            <BasePage template={"client-order"}></BasePage>
          </PrivateRoute>
          <PrivateRoute path="/supplier-orders" exact>
            <BasePage template={"supplier-order"}></BasePage>
          </PrivateRoute>
          <PrivateRoute path="/inventory" exact>
            <BasePage template={"inventory"}></BasePage>
          </PrivateRoute>
          <PrivateRoute path="/stock-inventory" exact>
            <BasePage template={"stock-inventory"}></BasePage>
          </PrivateRoute>
        </Switch>
      </AuthenticationProvider>
    </main>
  );
}

export default App;
