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
        setOriginalData(data);
        setRows(
          data.filter((item) => item.warehouse_zone === route[activeIndex])
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
    const currentZone = route[activeIndex];

    let filteredRows = originalData.filter((item) => {
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
