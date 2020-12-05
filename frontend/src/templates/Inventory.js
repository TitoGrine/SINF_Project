import React, { useState } from "react";
//material core
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
//components
import Searchbar from "../components/Searchbar";
import ZoneDropdown from "../components/ZoneDropdown";
import ListInventory from "../components/ListInventory";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

const rows = {
  VISTAALEGRE: {
    description: "Oporto Port - Fortified Wine",
    minStock: 30,
    maxStock: 130,
    totalStock: 40,
    warehouses: {
      A3B: {
        stock: 30,
      },
      D0: {
        stock: 0,
      },
      D1: {
        stock: 10,
      },
    },
  },
  VISTABELA: {
    description: "Oporto Port - Fortified Wine",
    minStock: 30,
    maxStock: 130,
    totalStock: 40,
    warehouses: {
      A3B: {
        stock: 30,
      },
      D0: {
        stock: 0,
      },
      D1: {
        stock: 10,
      },
    },
  },
  SYRAH: {
    description: "Lisboa Red Wine",
    minStock: 50,
    maxStock: 300,
    totalStock: 35,
    warehouses: {
      A1C: {
        stock: 20,
      },
      D0: {
        stock: 15,
      },
      D1: {
        stock: 0,
      },
    },
  },
  CHATEAULATOUR: {
    description: "French Red Wine 75cl",
    minStock: 5,
    maxStock: 20,
    totalStock: 0,
    warehouses: {
      A4D: {
        stock: 0,
      },
      D0: {
        stock: 0,
      },
      D1: {
        stock: 0,
      },
    },
  },
  TERRANTEZ: {
    description: "Madeira Dessert Wine",
    minStock: 5,
    maxStock: 60,
    totalStock: 0,
    warehouses: {
      A4A: {
        stock: 0,
      },
      D0: {
        stock: 0,
      },
      D1: {
        stock: 0,
      },
    },
  },
  QUINTACARDO: {
    description: "Beira Interior White Wine",
    minStock: 30,
    maxStock: 300,
    totalStock: 0,
    warehouses: {
      A2B: {
        stock: 0,
      },
      D0: {
        stock: 0,
      },
      D1: {
        stock: 0,
      },
    },
  },
  JP: {
    description: "Setúbal White Wine",
    minStock: 15,
    maxStock: 150,
    totalStock: 0,
    warehouses: {
      A2A: {
        stock: 0,
      },
      D0: {
        stock: 0,
      },
      D1: {
        stock: 0,
      },
    },
  },
};

function parseRows() {
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

const originalData = parseRows();

function Inventory() {
  const classes = useStyles();
  const [data, setData] = useState(originalData);

  const handleIdChange = (ev) => {
    const query = ev.target.value.trim();
    if (query === "") {
      setData(originalData);
      return;
    }

    // A RegEx that matches the query to the start of each id
    const regex = new RegExp("^" + query + ".*", "i");
    setData(data.filter((entry) => regex.test(entry.id)));
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
            <ZoneDropdown />
          </Grid>
        </Grid>
        <Grid item className={classes.list}>
          <ListInventory data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Inventory;
