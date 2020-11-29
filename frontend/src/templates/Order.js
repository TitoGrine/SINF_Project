import React from "react";
import "../index.css";
//material core
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//components
import ListOrders from "../components/ListOrders";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

function Order({ type }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <h1 className={classes.title}>
            {" "}
            {type === "client" ? "Clients" : "Suppliers"} Orders
          </h1>
        </Grid>
        <Grid item className={classes.list}>
          <ListOrders></ListOrders>
        </Grid>
        <Grid item>
          <Grid item className={classes.buttonwrp}>
            <Button className={classes.GnrBtn} variant="contained">
              Generate Route
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
