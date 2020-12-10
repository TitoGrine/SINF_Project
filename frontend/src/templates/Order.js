import React, { useContext } from "react";
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
import { OrderContext } from "../statemanagement/OrderContext";

const useStyles = makeStyles(orderStyle);

function Order({ type }) {
  const classes = useStyles();
  const [rowsSelected, setrowsSelected] = useContext(OrderContext);

  const handleButton = () => {
    let aux = rowsSelected.map((obj) => {
      let item = {
        ref: obj.productId,
        quantity: obj.quantity,
        location: obj.quantity,
        order_ref: obj.order_ref,
      };
      return item;
    });
    let object = {
      date: Date.now(),
      items: aux,
    };
    console.log(object)
  };

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
          <ModalProvider>
            <ListOrders type={type}></ListOrders>
          </ModalProvider>
        </Grid>
        <Grid item>
          <Grid item className={classes.buttonwrp}>
            <Button
              onClick={handleButton}
              className={classes.GnrBtn}
              variant="contained"
            >
              Generate Route
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
