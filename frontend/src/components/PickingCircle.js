import React from "react";

import pickingCircleStyle from "../style/pickingCircleStyle.js";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(pickingCircleStyle);

function PickingCircle({ first, active, disabled, location }) {
  const classes = useStyles();

  function getBeforeClasses() {
    let classList = classes.normalBefore;

    if (first) classList = classes.noBefore;
    if (disabled) classList += " " + classes.disabledBefore;
    if (active) classList += " " + classes.activeBefore;

    return classList;
  }

  function getCircleClasses() {
    let classList = classes.normal;

    if (active) classList += " " + classes.active;
    if (disabled) classList += " " + classes.disabled;

    return classList;
  }

  return (
    <div style={{ position: "relative" }}>
      <div className={getBeforeClasses()}></div>
      <div className={getCircleClasses()}>{location}</div>
    </div>
  );
}

export default PickingCircle;
