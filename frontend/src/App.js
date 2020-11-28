
import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./views/LoginPage.js";
import HomePage from "./views/HomePage.js";
import BasePage from "./views/BasePage.js";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>
        <Route path="/login" exact>
          <LoginPage></LoginPage>
        </Route>
        <Route path="/client-order" exact>
          <BasePage template={"client-order"}></BasePage>
        </Route>
        <Route path="/supplier-order" exact>
          <BasePage template={"supplier-order"}></BasePage>
        </Route>
        <Route path="/inventory" exact>
          <BasePage template={"inventory"}></BasePage>
        </Route>
        <Route path="/stock-inventory" exact>
          <BasePage template={"stock-inventory"}></BasePage>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
