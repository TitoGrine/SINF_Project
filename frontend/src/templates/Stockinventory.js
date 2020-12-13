import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ListStockInventory from "../components/ListStockInventory";
import orderStyle from "../style/orderStyle.js";
import { useLocation } from "react-router-dom";
import { StockProvider } from "../statemanagement/StockContext";

const useStyles = makeStyles(orderStyle);

function Stockinventory() {
  const classes = useStyles();
  const location = useLocation();
  const data = location.state.params;

  // let rows = [
  //   {
  //     id: 0,
  //     documentId: "EF0.13",
  //     storedquantity: "1",
  //     orderedquantity: "15",
  //     location: "A32",
  //     productId: "123",
  //   },
  //   {
  //     id: 1,
  //     documentId: "EF0.13",
  //     storedquantity: "1",
  //     orderedquantity: "15",
  //     location: "A45",
  //     productId: "123",
  //   },
  //   {
  //     id: 2,
  //     documentId: "EF0.13",
  //     storedquantity: "1",
  //     orderedquantity: "15",
  //     location: "A32",
  //     productId: "123",
  //   },
  //   {
  //     id: 3,
  //     documentId: "EF0.13",
  //     storedquantity: "1",
  //     orderedquantity: "15",
  //     location: "A32",
  //     productId: "dftry",
  //   },
  // ];

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h1 className={classes.title}>Stock Inventory</h1>
          <StockProvider>
            <ListStockInventory rows={data}></ListStockInventory>
          </StockProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stockinventory;
