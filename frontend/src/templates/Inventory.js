import React from "react";
import "../index.css";
//material core
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//components
import ListInventory from "../components/ListInventory";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

function Order({ type }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <h1 className={classes.title}>
              Inventory
          </h1>
        </Grid>
        <Grid item className={classes.list}>
          <ListInventory type={type}></ListInventory>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
