import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#CAA472",
  },
  formContainer: {
    width: "60%",
    height: "100%",
    marginRight: "0",
    marginLeft: "auto",
  },
  middleItems: {
    width: "100%",
    marginBottom: "2rem",
  },
  textFieldStyle: {
    backgroundColor: "#5B0012",
  },
  labelStyle: {
    marginLeft: ".2rem",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "transparent !important",
  },
  inputFocused: {
    boxShadow: "0 0 0 0.2rem rgba(91, 0, 18, 0.5)",
    transition: "box-shadow .25s ease-in-out",
  },
  inputColor: {
    color: "#CAA472",
  },
};

const LoginButton = withStyles({
  root: {
    backgroundColor: "#5B0012",
    color: "#CAA472",
    paddingLeft: "4rem",
    paddingRight: "4rem",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#5B0012",
      borderColor: "#CAA472",
      boxShadow: "0 0 0 0.2rem rgba(91, 0, 18, 0.5)",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#5B0012",
      borderColor: "#CAA472",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(91, 0, 18, 0.5)",
    },
  },
})(Button);

class LoginPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={6}>
          <form className={classes.container}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.formContainer}
            >
              <Grid item style={{ marginBottom: "5rem" }}>
                <h1 className="stylizedText" style={{ margin: 0 }}>
                  Vicino
                </h1>
              </Grid>
              <Grid item className={classes.middleItems}>
                <label htmlFor="email-input" className={classes.labelStyle}>
                  Email
                </label>
                <TextField
                  id="email-input"
                  classes={{ root: classes.textFieldStyle }}
                  InputProps={{
                    classes: {
                      focused: classes.inputFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    className: classes.inputColor,
                  }}
                  required
                  fullWidth
                  type="email"
                  name="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item className={classes.middleItems}>
                <label htmlFor="password-input" className={classes.labelStyle}>
                  Password
                </label>
                <TextField
                  id="password-input"
                  classes={{ root: classes.textFieldStyle }}
                  InputProps={{
                    classes: {
                      focused: classes.inputFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                    className: classes.inputColor,
                  }}
                  required
                  fullWidth
                  type="password"
                  name="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item style={{ alignSelf: "flex-end" }}>
                <LoginButton type="submit" size="large" variant="text">
                  Login
                </LoginButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={6}>
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

export default withStyles(styles)(LoginPage);
