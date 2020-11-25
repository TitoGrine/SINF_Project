
import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../src/views/Homepage.js";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
