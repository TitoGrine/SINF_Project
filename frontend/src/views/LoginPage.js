import React from "react";

import Grid from "@material-ui/core/Grid";
import LoginForm from "../components/LoginForm.js";
import { Hidden } from "@material-ui/core";

function LoginPage() {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <LoginForm></LoginForm>
      </Grid>
      <Hidden only="xs">
        <Grid item xs={6}>
          {/* The following div is used solely for the vorder,
              which is what gives us the triangle on the right*/}
          <div
            style={{
              height: 0,
              width: 0,
              borderLeft: "300px solid #CAA472",
              borderTop: "100vh solid transparent",
            }}
          ></div>
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default LoginPage;
