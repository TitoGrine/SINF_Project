import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LoginField from "./LoginField.js";
import ErrorIcon from "@material-ui/icons/ErrorOutline";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import loginFormStyle from "../style/loginFormStyle.js";

import { sendRequest } from "../requests.js";
import { useAuth } from "../statemanagement/AuthenticationContext";

const useStyles = makeStyles(loginFormStyle);

const LoginButton = withStyles({
  root: {
    backgroundColor: "#5B0012",
    color: "#CAA472",
    padding: ".8rem 3rem",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "1.1rem",
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

function LoginForm() {
  const { authToken, setAuthToken } = useAuth();
  const {
    container,
    formContainer,
    title,
    emailItem,
    passwordItem,
    errorMessage,
  } = useStyles();
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    const body = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    setIsError(false);

    sendRequest("POST", "http://localhost:8800/api/auth/login", body)
      .then((data) => {
        setAuthToken(data.token);
      })
      .catch((err) => {
        setIsError(true);
      });

    event.target.reset();
    event.preventDefault();
  };

  if (authToken) return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit} className={container}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={formContainer}
      >
        <Grid item className={title}>
          <h1 className="stylizedText" style={{ margin: 0, color: "#5B0012" }}>
            Vicino
          </h1>
        </Grid>
        <Grid item className={emailItem}>
          <LoginField label="Email" id="email" type="email"></LoginField>
        </Grid>
        <Grid item className={passwordItem}>
          <LoginField
            label="Password"
            id="password"
            type="password"
          ></LoginField>
        </Grid>
        <Grid item style={{alignSelf: "start"}}>
          {isError && (
            <p className={errorMessage}>
              <ErrorIcon fontSize="small" style={{marginRight: ".5rem"}}/>
              Credentials did not match. Please try again.
            </p>
          )}
        </Grid>
        <Grid
          item
          style={
            isError
              ? { alignSelf: "flex-end" }
              : { alignSelf: "flex-end", marginTop: "2rem" }
          }
        >
          <LoginButton type="submit" size="large" variant="text">
            Login
          </LoginButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
