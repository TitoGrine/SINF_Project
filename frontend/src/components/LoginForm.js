import React , { useContext } from "react";
import { sendHttpRequest } from "../requests.js";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LoginField from "./LoginField.js";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import loginFormStyle from "../style/loginFormStyle.js";

//state management
import { AuthenticationContext } from "../statemanagement/AuthenticationContext.js";

const useStyles = makeStyles(loginFormStyle);

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

function LoginForm() {

  const [token, setToken] = useContext(AuthenticationContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    sendHttpRequest("GET", "http://localhost:8800/token")
      .then((data) => {
        setToken(data.access_token);
        history.push("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { container, formContainer, title, middleItems } = useStyles();
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
        <Grid item className={middleItems}>
          <LoginField label="Email" id="email" type="email"></LoginField>
        </Grid>
        <Grid item className={middleItems}>
          <LoginField
            label="Password"
            id="password"
            type="password"
          ></LoginField>
        </Grid>
        <Grid item style={{ alignSelf: "flex-end" }}>
          <LoginButton type="submit" size="large" variant="text">
            Login
          </LoginButton>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
