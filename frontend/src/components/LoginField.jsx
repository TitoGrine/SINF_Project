import React from "react";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import loginFieldStyle from "../style/loginFieldStyle.jsx";

const useStyles = makeStyles(loginFieldStyle);

const LoginField = (props) => {
  const {
    textFieldStyle,
    labelStyle,
    notchedOutline,
    inputFocused,
    inputColor,
  } = useStyles();
  return (
    <React.Fragment>
      <label htmlFor={props.id + "-input"} className={labelStyle}>
        {props.label}
      </label>
      <TextField
        id={props.id + "-input"}
        classes={{ root: textFieldStyle }}
        InputProps={{
          classes: {
            focused: inputFocused,
            notchedOutline: notchedOutline,
          },
          className: inputColor,
        }}
        required
        fullWidth
        type={props.type}
        name={props.id}
        variant="outlined"
      />
    </React.Fragment>
  );
};

export default LoginField;
