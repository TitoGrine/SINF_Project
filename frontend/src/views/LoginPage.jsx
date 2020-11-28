import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={6}>
          <LoginForm></LoginForm>
        </Grid>
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
      </Grid>
    );
  }
}

export default LoginPage;
