import React from "react";
//material core
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import homeButtonStyle from "../style/homeButtonStyle.js";

const useStyles = makeStyles(homeButtonStyle);

function HomeButton({ name, image }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.btnGrid}>
      <Grid item style={{ marginRight: ".5rem" }}>
        <div className={classes.iconCircle + " icon-circle"}>
          <img
            src={"./assets/" + image}
            alt={image}
            className={classes.iconImg}
          />
        </div>
      </Grid>
      <Grid item>
        <p className={classes.btnText}>{name}</p>
      </Grid>
    </Grid>
  );
}

export default HomeButton;
