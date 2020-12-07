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
  const [dataReady, setDataReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoneQuery, setZoneQuery] = useState("");

  /**
   * Hook to fetch data from backend.
   * Only runs after first render (equivalent to componentDidMount).
   */
  useEffect(() => {
    getInventory();
  }, []);

  /**
   * Hook to filter presented rows.
   * Only runs if any query changes.
   */
  useEffect(() => {
    filterResults();
  }, [searchQuery, zoneQuery]);

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

  function filterResults() {
    console.log(`Search: "${searchQuery}"`);
    console.log(`Zone: "${zoneQuery}"`);
    if (searchQuery === "" && zoneQuery === "") {
      setRows(originalData);
      return;
    }

    let filteredData = originalData;

    if (searchQuery !== "") {
      // A RegEx that matches the searchQuery to the start of each id
      const searchRegex = new RegExp("^" + searchQuery + ".*", "i");
      filteredData = filteredData.filter((entry) => searchRegex.test(entry.id));
    }

    if (zoneQuery !== "") {
      // A RegEx that matches the zoneQuery to the start of each warehouse
      const zoneRegex = new RegExp("^" + zoneQuery + ".*", "i");
      filteredData = filteredData.filter((entry) => {
        for (const warehouse of entry.warehouses) {
          if (zoneRegex.test(warehouse.location)) return true;
        }

        return false;
      });
    }

    setRows(filteredData);
  }

  async function getInventory() {
    getData(
      "GET",
      "http://localhost:8800/api/stock",
      localStorage.getItem("session"),
      localStorage.getItem("token")
    )
      .then((data) => {
        const parsed = parseRows(data);
        setOriginalData(parsed);
        setRows(parsed);
        setDataReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleIdChange = (ev) => {
    setSearchQuery(ev.target.value.trim());
  };

  const handleZoneChange = (ev) => {
    setZoneQuery(ev.target.value);
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
          <ListInventory rows={rows} isDataReady={dataReady} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Inventory;
