import React from "react";
//material core
import { makeStyles } from "@material-ui/core/styles";

import navButtonStyle from "../style/navButtonStyle.js";

const useStyles = makeStyles(navButtonStyle);

function NavButton({ name, image }) {
  const classes = useStyles();

  return (
    <div className={classes.circle}>
      <img src={"./assets/" + image} alt={image} className={classes.iconImg} />
    </div>
  );
}

export default NavButton;
