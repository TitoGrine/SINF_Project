import React from "react";
//material core
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
//components
import Searchbar from "../components/Searchbar";
import ZoneDropdown from "../components/ZoneDropdown";
import ListInventory from "../components/ListInventory";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

function Inventory() {
  const classes = useStyles();

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <h1 className={classes.title}>
            Inventory
          </h1>
        </Grid>
        <Grid item container alignItems="center" style={{ padding: "0 2em", marginBottom: ".8rem" }}>
          <Grid item>
            <Searchbar/>
          </Grid>
          <Grid item>
            <ZoneDropdown/>
          </Grid>
        </Grid>
        <Grid item className={classes.list}>
          <ListInventory></ListInventory>
        </Grid>
      </Grid>
    </div>
  );
}

export default Inventory;
