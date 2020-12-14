import React, { useState, useEffect, useLayoutEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//material core
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { CircularProgress, makeStyles } from "@material-ui/core";

import ListPicking from "../components/ListPicking";
import PickingCircle from "../components/PickingCircle";

import pickingStyle from "../style/pickingStyle.js";
import { useAuth } from "../statemanagement/AuthenticationContext";
import { getData, sendRequest } from "../requests";

const useStyles = makeStyles(pickingStyle);

function PickingRoute() {
  const history = useHistory();
  const classes = useStyles();
  const [originalData, setOriginalData] = useState([]);
  const [rows, setRows] = useState([]);
  const [route, setRoute] = useState([]);
  const [wrapped, setWrapped] = useState(true);
  const [isTransferDone, setTransferDone] = useState(false);
  const [isGeneratingDelivery, setGeneratingDelivery] = useState(false);
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
        data.forEach((row) => {
          row["picked"] = false;
          row["selected_quantity"] = 0;
        });
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

  function transferStock(obj) {
    let bodyObj = getRequestBody(obj, false);

    // Passo 1. Transferir stock todo para o D1
    sendRequest(
      "POST",
      "http://localhost:8800/api/stock/transfer",
      bodyObj,
      localStorage.getItem("token")
    )
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === 401) {
            setAuthToken("");
            return;
          }
        }
        setTransferDone(true);
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        if (error.status === 401) setAuthToken("");
      });
  }

  function getRequestBody(obj, fullInfo) {
    let bodyObj = [];

    obj.forEach((item) => {
      if (item.picked === false) return;

      for (let i = 0; i < bodyObj.length; i++) {
        if (bodyObj[i].sourceWarehouse === item.warehouse_zone) {
          addItemToTransfer(item, bodyObj[i], fullInfo);
          return;
        }
      }

      addNewTransferEntry(item, bodyObj, fullInfo);
    });

    return bodyObj;
  }

  function addItemToTransfer(item, transfer, fullInfo) {
    let newItem = {
      quantity: item.selected_quantity,
      materialsItem: item.ref,
    };

    if (fullInfo) {
      newItem.sourceDocLineNumber = item.line_number;
      newItem.sourceDocKey = item.order_ref;
    }

    transfer.items.push(newItem);
  }

  function addNewTransferEntry(item, transfer, fullInfo) {
    let newEntry = {
      sourceWarehouse: item.warehouse_zone,
      targetWarehouse: "D1",
      items: [
        {
          quantity: item.selected_quantity,
          materialsItem: item.ref,
        },
      ],
    };

    if (fullInfo) {
      newEntry.items[0].sourceDocLineNumber = item.line_number;
      newEntry.items[0].sourceDocKey = item.order_ref;
    }

    transfer.push(newEntry);
  }

  function generateDelivery(obj) {
    let bodyObj = getRequestBody(obj, true);

    // Passo 2. Pedido ao Generate Delivery (através de um modal)
    sendRequest(
      "POST",
      "http://localhost:8800/api/client/delivery",
      bodyObj,
      localStorage.getItem("token")
    )
      .then((data) => {
        alert("Delivery Note(s) created succesfully");
        history.push("/");
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        if (error.status === 401) setAuthToken("");
        else {
          alert("An error has ocurred");
          history.push("/");
        }
      });

    setGeneratingDelivery(true);
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

  function getButton() {
    if (activeIndex === route.length - 1) {
      return (
        <Button
          className={classes.button}
          onClick={nextZone}
          variant="contained"
        >
          Finish
        </Button>
      );
    } else if (activeIndex >= route.length - 1) {
      return (
        <Button
          className={classes.button}
          onClick={nextZone}
          variant="contained"
        >
          {isGeneratingDelivery ? (
            <CircularProgress className={classes.progress} color="inherit" />
          ) : (
            "Generate Delivery"
          )}
        </Button>
      );
    }

    return (
      <Button className={classes.button} onClick={nextZone} variant="contained">
        Next
      </Button>
    );
  }

  function nextZone() {
    if (activeIndex < route.length) {
      setActiveIndex(activeIndex + 1);
    }

    if (activeIndex === route.length - 1) {
      transferStock(originalData);
      return;
    }

    if (activeIndex === route.length) {
      generateDelivery(originalData);
      return;
    }
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
          {activeIndex < route.length ? (
            <ListPicking
              rows={rows}
              selectable
              withInput
              isDataReady={true}
              onQuantityChange={handleQuantityChange}
              onCheckboxChange={handleCheckboxChange}
            />
          ) : (
            <ListPicking
              rows={originalData.filter((item) => item.picked)}
              isDataReady={isTransferDone}
              onQuantityChange={handleQuantityChange}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </Grid>
        <Grid item>
          <div className={classes.buttonWrapper}>
            {activeIndex < route.length && (
              <Button
                className={classes.button}
                style={{ marginLeft: "1rem" }}
                onClick={() => history.push("/client-orders")}
                variant="contained"
              >
                Cancel
              </Button>
            )}
            {activeIndex > 0 && activeIndex < route.length && (
              <Button
                className={classes.button}
                style={{ marginRight: "1rem" }}
                onClick={previousZone}
                variant="contained"
              >
                Back
              </Button>
            )}
            {getButton()}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PickingRoute;
