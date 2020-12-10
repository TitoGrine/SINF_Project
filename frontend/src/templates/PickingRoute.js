import React, { useState, useEffect, useLayoutEffect } from "react";
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
    picked_quantity: 0,
  },
  {
    id: 3,
    ref: "TONSDUORUM",
    quantity: 30,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A2D",
    ref_picking: "PW2020_1",
    picked_quantity: 2,
  },
  {
    id: 4,
    ref: "PAPAFIGOS",
    quantity: 25,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A1B",
    ref_picking: "PW2020_1",
    picked_quantity: 0,
  },
];

const route = ["A2D", "A1B", "A3A", "A3D", "A2D", "A1B", "A3A"];

function PickingRoute() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [wrapped, setWrapped] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    filterRows();
  }, [activeIndex]);

  useLayoutEffect(() => {
    function measureCircles() {
      const parent = document.getElementById("circlesParent");
      const parentWidth = parent.getBoundingClientRect().width;
      let childrenWidth = 0;
      for (let i = 0; i < parent.children.length; i++) {
        childrenWidth += parent.children[i].getBoundingClientRect().width;
      }
      let val = childrenWidth > parentWidth;
      if (val !== wrapped) setWrapped(val);
    }
    window.addEventListener("resize", measureCircles);
    measureCircles();
    return () => window.removeEventListener("resize", measureCircles);
  }, [wrapped]);

  function filterRows() {
    const currentZone = route[activeIndex];

    let filteredRows = items.filter((item) => {
      return item.warehouse_zone === currentZone;
    });

    setRows(filteredRows);
  }

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

  function nextZone() {
    setActiveIndex(activeIndex + 1);
  }

  function previousZone() {
    setActiveIndex(activeIndex - 1);
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
          wrap="nowrap"
          justify={wrapped ? "flex-start" : "center"}
          alignItems="center"
          id="circlesParent"
          className={classes.pickingCircles}
        >
          {route.map((location, index) => (
            <Grid item key={index} style={{ margin: ".8rem 0" }}>
              {getPickingCircle(location, index)}
            </Grid>
          ))}
        </Grid>
        <Grid item className={classes.list}>
          <ListPicking rows={rows} />
        </Grid>
        <Grid item>
          <div className={classes.buttonWrapper}>
            {activeIndex > 0 && (
              <Button
                className={classes.button}
                style={{ marginRight: "1rem" }}
                onClick={previousZone}
                variant="contained"
              >
                Back
              </Button>
            )}
            <Button
              className={classes.button}
              onClick={nextZone}
              variant="contained"
            >
              {activeIndex >= route.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PickingRoute;
