import React, { useState, useEffect } from "react";
//material core
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import ListPicking from "../components/ListPicking";
import PickingCircle from "../components/PickingCircle";

import pickingStyle from "../style/pickingStyle.js";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(pickingStyle);

const items = [
  {
    id: 1,
    ref: "BACALHOA",
    quantity: 10,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3A",
    ref_picking: "PW2020_1",
    picked_quantity: 0,
  },
  {
    id: 2,
    ref: "VULCANICO",
    quantity: 25,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3D",
    ref_picking: "PW2020_1",
  },
  {
    id: 3,
    ref: "TONSDUORUM",
    quantity: 30,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A2D",
    ref_picking: "PW2020_1",
  },
  {
    id: 4,
    ref: "PAPAFIGOS",
    quantity: 25,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A1B",
    ref_picking: "PW2020_1",
  },
];

const route = ["A2D", "A1B", "A3A", "A3D"];

function PickingRoute() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  function getPickingCircle(location, index) {
    if (index === 0 && activeIndex === index) {
      return <PickingCircle active first location={location} />;
    }
    if (index === 0) {
      return <PickingCircle first location={location} />;
    }
    if (index < activeIndex) {
      return <PickingCircle location={location} />;
    }
    if (index > activeIndex) {
      return <PickingCircle disabled location={location} />;
    }

    return <PickingCircle active location={location} />;
  }

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <h1 className={classes.title} style={{ marginBottom: 0 }}>
            Picking Route
          </h1>
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          className={classes.pickingCircles}
        >
          {route.map((location, index) => (
            <Grid item key={index}>
              {getPickingCircle(location, index)}
            </Grid>
          ))}
        </Grid>
        <Grid item className={classes.list}>
          <ListPicking rows={items} />
        </Grid>
        <Grid item>
          <Grid item className={classes.buttonWrapper}>
            <Button className={classes.button} variant="contained">
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default PickingRoute;
