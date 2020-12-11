import React from "react";
import { Redirect } from "react-router-dom";
//material core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { useAuth } from "../statemanagement/AuthenticationContext";

import navButtonStyle from "../style/navButtonStyle.js";

const useStyles = makeStyles(navButtonStyle);

function LogoutButton() {
  const { setAuthToken } = useAuth();
  const classes = useStyles();

  const handleMouseEnter = (ev) => {
    const circle = ev.currentTarget.getElementsByClassName("icon-circle")[0];
    if (circle !== undefined)
      circle.style["boxShadow"] = "0 0 20px 0 rgba(0,0,0,0.5)";
  };

  const handleMouseLeave = (ev) => {
    const circle = ev.currentTarget.getElementsByClassName("icon-circle")[0];
    if (circle !== undefined) circle.style["boxShadow"] = "none";
  };

  const handleClick = () => {
    setAuthToken("");
    <Redirect to="/login" />;
  };

  return (
    <Button
      variant="text"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: "transparent", width: "100%" }}
      disableRipple
      onClick={handleClick}
    >
      <div className={classes.circle + " icon-circle"}>
        <img
          src={"../assets/exit.svg"}
          alt="Logout Button"
          className={classes.iconImg}
        />
      </div>
    </Button>
  );
}

export default LogoutButton;
