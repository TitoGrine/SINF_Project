import React from "react";
// base css configurations
import "../index.css";
// material ui core
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import ImageButton from "../components/imageButton.js"


import { makeStyles } from "@material-ui/core/styles";
import style from "../style/homepageStyle.js";

const styles = { ...style };
const useStyles = makeStyles(styles);

//TODO: customize error page
function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <Container maxWidth="lg">
        <Card>
          <h1>Vicino</h1>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={3}>
              <ImageButton name="Supplier Orders" image="grape.svg"></ImageButton>
            </Grid>
            <Grid item xs={3}>
              <span >
                Inventory
              </span>
            </Grid>
            <Grid item xs={3}>
              <span >
                Client Orders
              </span>
            </Grid>
            <Grid item xs={3}>
              <span >
                Warehouse Map
              </span>
            </Grid>
          </Grid>
          <h5> Logout</h5>
        </Card>
      </Container>
    </div>
  );
}

export default Homepage;
