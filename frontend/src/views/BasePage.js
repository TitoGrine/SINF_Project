import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// base css configurations
import "../index.css";
// material ui core
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
//route components
import Order from "../templates/Order";
import Inventory from "../templates/Inventory";
import PickingRoute from "../templates/PickingRoute";
import StockInventory from "../templates/Stockinventory";
//components
import BaseButton from "../components/BaseButton";

import basePageStyle from "../style/basePageStyle";
import LogoutButton from "../components/LogoutButton";

//statemanagement
import { OrderProvider } from "../statemanagement/OrderContext";
import WarehouseModal from "../components/WarehouseModal";

const useStyles = makeStyles(basePageStyle);

//TODO: probably change this logic to something better
function getTemplate(template) {
  switch (template) {
    case "client-order":
      return (
        <OrderProvider>
          <Order type={"client"}></Order>
        </OrderProvider>
      );
    case "supplier-order":
      return (
        <OrderProvider>
          <Order type={"supplier"}></Order>
        </OrderProvider>
      );
    case "inventory":
      return <Inventory></Inventory>;
    case "stock-inventory":
      return <StockInventory></StockInventory>;
    case "picking-route":
      return <PickingRoute></PickingRoute>;
    default:
      return null;
  }
}

//TODO: customize error page
function BasePage({ template }) {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const routeChange = () => {
    history.push("/");
  };

  return (
    <div className={classes.mainDiv}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <h1 onClick={routeChange} className={classes.stylizedText}>
              Vicino
            </h1>
          </Grid>
          <Grid className={classes.icons} item xs={4} sm={2} md={1} lg={1}>
            <BaseButton
              type={"nav"}
              image={"grape.svg"}
              name={"supplier-orders"}
            ></BaseButton>
          </Grid>
          <Grid className={classes.icons} item xs={4} sm={2} md={1} lg={1}>
            <BaseButton
              type={"nav"}
              image={"wine-barrel.svg"}
              name={"client-orders"}
            ></BaseButton>
          </Grid>
          <Grid className={classes.icons} item xs={4} sm={2} md={1} lg={1}>
            <BaseButton
              type={"nav"}
              image={"wine-bottle.svg"}
              name={"inventory"}
            ></BaseButton>
          </Grid>
          <Grid className={classes.icons} item xs={4} sm={2} md={1} lg={1}>
            <BaseButton
              type={"nav"}
              image={"architecture.svg"}
              name={"warehouse"}
              event={setShowModal}
            ></BaseButton>
          </Grid>
          <Grid className={classes.icons} item xs={3} sm={2} md={1} lg={1}>
            <LogoutButton />
          </Grid>
        </Grid>
        <Card className={classes.card}>
          <CardContent>{getTemplate(template)}</CardContent>
        </Card>
      </Container>
      {showModal && (
        <WarehouseModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default BasePage;
