import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ListStockInventory from "../components/ListStockInventory";
import orderStyle from "../style/orderStyle.js";
import { useLocation } from "react-router-dom";
import { StockProvider } from "../statemanagement/StockContext";
import { StockInventoryProvider } from "../statemanagement/StockInventoryContext";

const useStyles = makeStyles(orderStyle);

function Stockinventory() {
  const classes = useStyles();
  const location = useLocation();
  const data = location.state.params;

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h1 className={classes.title}>Stock Inventory</h1>
          <StockProvider>
            <StockInventoryProvider>
              <ListStockInventory rows={data}></ListStockInventory>
            </StockInventoryProvider>
          </StockProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stockinventory;
