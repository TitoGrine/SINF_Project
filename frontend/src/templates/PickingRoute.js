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
import { getData, sendRequest } from "../requests";

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
    let bodyObj = [];

    obj.forEach((item) => {
      if (item.picked === false) return;

      for (let i = 0; i < bodyObj.length; i++) {
        if (bodyObj[i].sourceWarehouse === item.warehouse_zone) {
          addItemToTransfer(item, bodyObj);
          return;
        }
      }

      addNewTransferEntry(item, bodyObj);
    });

    console.log(bodyObj);
    // Passo 1. Transferir stock todo para o D1
    // sendRequest("POST", "http://localhost:8800/api/stock/transfer", obj)
    //   .then((data) => {
    //     // Mostrar modal com botão e tal
    //   })
    //   .catch((err) => {
    //     const error = JSON.parse(err.message);
    //     if (error.status === 401) setAuthToken("");
    //   });

    // Passo 2. Pedido ao Generate Delivery (através de um modal)
    // igual ao transfer stock, mas com o DocKey e DocLine dentro de cada item
  }

  function addItemToTransfer(item, transfer) {
    let newItem = {
      sourceDocLineNumber: item.line_number,
      sourceDocKey: item.order_ref,
      quantity: item.selected_quantity,
      materialsItem: item.ref,
    };

    transfer.items.push(newItem);
  }

  function addNewTransferEntry(item, transfer) {
    let newEntry = {
      sourceWarehouse: item.warehouse_zone,
      targetWarehouse: "D1",
      items: [
        {
          sourceDocLineNumber: item.line_number,
          sourceDocKey: item.order_ref,
          quantity: item.selected_quantity,
          materialsItem: item.ref,
        },
      ],
    };

    transfer.push(newEntry);
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

  function getTransferedInfo(obj) {
    let selected = obj.filter((item) => item.picked);

    return selected;
  }

  function nextZone() {
    if (activeIndex < route.length) {
      setActiveIndex(activeIndex + 1);
    }

    if (activeIndex === route.length - 1) {
      transferStock(originalData);
      console.log("Finished");
      return;
    }

    if (activeIndex === route.length) {
      console.log("Deliveries");
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
              onQuantityChange={handleQuantityChange}
              onCheckboxChange={handleCheckboxChange}
            />
          ) : (
            <ListPicking
              rows={getTransferedInfo(originalData)}
              onQuantityChange={handleQuantityChange}
              onCheckboxChange={handleCheckboxChange}
            />
          )}
        </Grid>
        <Grid item>
          <div className={classes.buttonWrapper}>
            {activeIndex > 0 && activeIndex < route.length - 1 && (
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
              {activeIndex >= route.length - 1
                ? activeIndex === route.length - 1
                  ? "Finish"
                  : "Generate Delivery"
                : "Next"}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PickingRoute;
