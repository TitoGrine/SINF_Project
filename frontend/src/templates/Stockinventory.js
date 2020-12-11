import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ListStockInventory from "../components/ListStockInventory";
import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

function Stockinventory() {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item>
          <h1 className={classes.title} >Stock Inventory</h1>
          <ListStockInventory></ListStockInventory>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stockinventory;
