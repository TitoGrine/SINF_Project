import React, { useState, useEffect } from "react";
//material core
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
//components
import Searchbar from "../components/Searchbar";
import ZoneDropdown from "../components/ZoneDropdown";
import ListInventory from "../components/ListInventory";

import { getData } from "../requests.js";
import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

function Inventory() {
  const classes = useStyles();
  const [originalData, setOriginalData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getInventory();
  }, []);

  function parseRows(rows) {
    let values = Object.entries(rows).map(([id, info]) => {
      info["id"] = id;
      info["selectedWarehouse"] = 0;
      return info;
    });

    let parsedRows = values.map((obj) => {
      let newWarehouses = Object.entries(obj.warehouses).map(
        ([warehouse, info]) => {
          info["location"] = warehouse;
          return info;
        }
      );
      obj.warehouses = newWarehouses;
      return obj;
    });

    return parsedRows;
  }

  async function getInventory() {
    getData(
      "GET",
      "http://localhost:8800/api/stock",
      localStorage.getItem("token")
    )
      .then((data) => {
        const parsed = parseRows(data);
        setOriginalData(parsed);
        setRows(parsed);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleIdChange = (ev) => {
    const query = ev.target.value.trim();
    if (query === "") {
      setRows(originalData);
      return;
    }

    // A RegEx that matches the query to the start of each id
    const regex = new RegExp("^" + query + ".*", "i");
    setRows(originalData.filter((entry) => regex.test(entry.id)));
  };

  const handleZoneChange = (ev) => {
    const query = ev.target.value;
    if (query === "") {
      setRows(originalData);
      return;
    }

    // A RegEx that matches the query to the start of each warehouse
    const regex = new RegExp("^" + query + ".*", "i");
    setRows(
      originalData.filter((entry) => {
        for (const warehouse of entry.warehouses) {
          if (regex.test(warehouse.location)) return true;
        }

        return false;
      })
    );
  };

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <h1 className={classes.title}>Inventory</h1>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          style={{ padding: "0 2em", marginBottom: ".8rem" }}
        >
          <Grid item>
            <Searchbar onChange={handleIdChange} />
          </Grid>
          <Grid item>
            <ZoneDropdown onChange={handleZoneChange} />
          </Grid>
        </Grid>
        <Grid item className={classes.list}>
          <ListInventory rows={rows} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Inventory;
