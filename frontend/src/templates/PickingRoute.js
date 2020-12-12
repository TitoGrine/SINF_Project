import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
//material core
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import ListPicking from "../components/ListPicking";
import PickingCircle from "../components/PickingCircle";

import pickingStyle from "../style/pickingStyle.js";
import { useAuth } from "../statemanagement/AuthenticationContext";
import { getData } from "../requests";

const useStyles = makeStyles(pickingStyle);

const items = [
  {
    id: 1,
    ref: "BACALHOA",
    quantity: 10,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3A",
    ref_picking: "PW2020_1",
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
  {
    id: 5,
    ref: "BACALHOA",
    quantity: 10,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3A",
    ref_picking: "PW2020_1",
  },
  {
    id: 6,
    ref: "VULCANICO",
    quantity: 25,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3A",
    ref_picking: "PW2020_1",
  },
  {
    id: 7,
    ref: "TONSDUORUM",
    quantity: 30,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3A",
    ref_picking: "PW2020_1",
  },
  {
    id: 8,
    ref: "PAPAFIGOS",
    quantity: 25,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3A",
    ref_picking: "PW2020_1",
  },
  {
    id: 9,
    ref: "BACALHOA",
    quantity: 10,
    order_ref: "ECL.2020.8",
    warehouse_zone: "A3A",
    ref_picking: "PW2020_1",
  },
];

function PickingRoute() {
  const classes = useStyles();
  const [originalData, setOriginalData] = useState([]);
  const [rows, setRows] = useState([]);
  const [route, setRoute] = useState([]);
  const [wrapped, setWrapped] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setAuthToken } = useAuth();
  const { id } = useParams();

  /**
   * Hook to fetch data from backend.
   * First it fetches the route and once setRoute is called it triggers the next hook.
   * This last hook fetches the items and filters the first zone right away.
   * Only runs after first render (equivalent to componentDidMount).
   */
  useEffect(() => {
    getRoute();
  }, []);

  useEffect(() => {
    getRows();
  }, [route]);

  /**
   * Hook to detect if the circles in the picking diagram wrap.
   * In that case, the content is justified to the start so
   * the scroll works correctly
   */
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

  /**
   * Hook to filter presented rows.
   * Only runs if activeIndex changes.
   */
  useEffect(() => {
    filterRows();
  }, [activeIndex]);

  function getRows() {
    getData(
      "GET",
      `http://localhost:8800/api/picking-wave/${id}/items`,
      localStorage.getItem("token")
    )
      .then((data) => {
        items.forEach((row) => {
          row["picked"] = false;
          row["selected_quantity"] = 0;
        });
        setOriginalData(items);
        setRows(
          items.filter((item) => item.warehouse_zone === route[activeIndex])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRoute() {
    getData(
      "GET",
      `http://localhost:8800/api/picking-wave/${id}/route`,
      localStorage.getItem("token")
    )
      .then((data) => {
        setRoute(data.route);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function filterRows() {
    let filteredRows = originalData.filter((item) => {
      return item.warehouse_zone === route[activeIndex];
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
    if (activeIndex < route.length - 1) {
      setActiveIndex(activeIndex + 1);
      return;
    }

    console.log(originalData);
    console.log("Finished");
  }

  function previousZone() {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  }

  function handleQuantityChange(rowID, value) {
    originalData.forEach((row) => {
      if (row.id === rowID) {
        row.selected_quantity = value;
      }
    });

    setOriginalData(originalData);
  }

  function handleCheckboxChange(rowID, checked) {
    originalData.forEach((row) => {
      if (row.id === rowID) {
        row.picked = checked;
      }
    });

    setOriginalData(originalData);
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
          <ListPicking
            rows={rows}
            onQuantityChange={handleQuantityChange}
            onCheckboxChange={handleCheckboxChange}
          />
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
