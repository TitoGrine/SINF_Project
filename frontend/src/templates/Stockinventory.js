import React from "react";
import Grid from "@material-ui/core/Grid";

import ListStockInventory from "../components/ListStockInventory";

function Stockinventory() {
  return (
    <div>
      <Grid container>
        <Grid item>
          <h1>Stock Inventory</h1>
        </Grid>
        <Grid item>
          <ListStockInventory></ListStockInventory>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stockinventory;
