
import React from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "../src/views/Homepage.js";
import Basepage from "../src/views/Basepage.js";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
        <Route path="/client-order" exact>
          <Basepage template={"client-order"}></Basepage>
        </Route>
        <Route path="/supplier-order" exact>
          <Basepage template={"supplier-order"}></Basepage>
        </Route>
        <Route path="/inventory" exact>
          <Basepage template={"inventory"}></Basepage>
        </Route>
        <Route path="/stock-inventory" exact>
          <Basepage template={"stock-inventory"}></Basepage>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
