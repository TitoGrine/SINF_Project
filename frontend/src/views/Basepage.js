import React from "react";
// base css configurations
import "../index.css";
// material ui core
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import Order from "../templates/Order.js";
import Inventory from "../templates/Inventory.js";
import PickingRoute from "../templates/Pickingroute.js";
import StockInventory from "../templates/Stockinventory.js";

import HomeButton from "../components/HomeButton.js";

import basePageStyle from "../style/basePageStyle.js";

const useStyles = makeStyles(basePageStyle);

//TODO: probably change this logic to something better
function getTemplate(template) {
  switch (template) {
    case "client-order":
      return <Order type={"client"}></Order>;
    case "supplier-order":
      return <Order type={"supplier"}></Order>;
    case "inventory":
      return <Inventory></Inventory>;
    case "stock-inventory":
      return <StockInventory></StockInventory>;
    case "picking-route":
      return <PickingRoute></PickingRoute>;
  }
}

//TODO: customize error page
function BasePage({ template }) {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <h1>Vicino</h1>
          </Grid>
          <Grid item xs={4} sm={2} md={1} lg={1}>
            <HomeButton image={"grape.svg"} name={""}></HomeButton>
          </Grid>
          <Grid item xs={4} sm={2} md={1} lg={1}>
            <HomeButton image={"wine-barrel.svg"} name={""}></HomeButton>
          </Grid>
          <Grid item xs={4} sm={2} md={1} lg={1}>
            <HomeButton image={"wine-bottle.svg"} name={""}></HomeButton>
          </Grid>
          <Grid item xs={4} sm={2} md={1} lg={1}>
            <HomeButton image={"architecture.svg"} name={""}></HomeButton>
          </Grid>
          <Grid item xs={3} sm={2} md={1} lg={1}>
            <HomeButton image={"grape.svg"} name={""}></HomeButton>
          </Grid>
        </Grid>
        <Card>{getTemplate(template)}</Card>
      </Container>
    </div>
  );
}

export default BasePage;
