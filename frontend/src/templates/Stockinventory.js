import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ListStockInventory from "../components/ListStockInventory";
import orderStyle from "../style/orderStyle.js";

import { StockProvider } from "../statemanagement/StockContext";

const useStyles = makeStyles(orderStyle);

function Stockinventory() {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h1 className={classes.title}>Stock Inventory</h1>
          <StockProvider>
            <ListStockInventory></ListStockInventory>
          </StockProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stockinventory;
