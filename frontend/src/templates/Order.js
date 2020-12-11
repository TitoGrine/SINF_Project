import React from "react";
import "../index.css";
//material core
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//components
import ListOrders from "../components/ListOrders";

import orderStyle from "../style/orderStyle.js";

//state management
import { ModalProvider } from "../statemanagement/ModalContext";

const useStyles = makeStyles(orderStyle);

function Order({ type }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="column">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h1 className={classes.title}>
            {" "}
            {type === "client" ? "Clients" : "Suppliers"} Orders
          </h1>
          <ModalProvider>
            <ListOrders type={type}></ListOrders>
          </ModalProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
