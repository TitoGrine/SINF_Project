import React, { useState, useEffect } from "react";
//material core
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
//components
import Searchbar from "../components/Searchbar";
import ZoneDropdown from "../components/ZoneDropdown";
import ListInventory from "../components/ListInventory";

import { getData } from "../requests.js";
import inventoryStyle from "../style/inventoryStyle.js";
import { useAuth } from "../statemanagement/AuthenticationContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(inventoryStyle);

function Inventory() {
  const classes = useStyles();
  const history = useHistory();
  const [originalData, setOriginalData] = useState([]);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoneQuery, setZoneQuery] = useState("");
  const { setAuthToken } = useAuth();

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
    return Object.entries(rows).map(([id, info]) => {
      info["id"] = id;
      info["selectedWarehouse"] = 0;
      return info;
    });
  }

  function filterResults() {
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
      localStorage.getItem("token")
    )
      .then((data) => {
        const parsed = parseRows(data);
        setOriginalData(parsed);
        setRows(parsed);
        setDataReady(true);
      })
      .catch((err) => {
        const status = err.message;
        if (status === 401) setAuthToken("");
        else {
          alert("Failed to fetch inventory");
          history.push("/");
        }
      });
  }

  const handleIdChange = (ev) => {
    setSearchQuery(ev.target.value.trim());
    setPage(1);
  };

  const handleZoneChange = (ev) => {
    setZoneQuery(ev.target.value);
    setPage(1);
  };

  const handlePageChange = (params) => {
    setPage(params.page);
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
          <ListInventory
            rows={rows}
            isDataReady={dataReady}
            page={page}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Inventory;
