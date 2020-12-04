import React from "react";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

import orderStyle from "../style/orderStyle.js";
import { MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(orderStyle);

const columns = [
  {
    field: "id",
    headerName: "Product ID",
    width: 250,
    headerClassName: "header",
  },
  {
    field: "description",
    flex: 1,
    headerName: "Description",
    headerClassName: "header",
  },
  {
    field: "totalStock",
    headerName: "Stock",
    width: 150,
    headerClassName: "header",
  },
  {
    field: "location",
    headerName: "Zone",
    sortable: false,
    disableClickEventBubbling: true,
    width: 150,
    headerClassName: "header",
    renderCell: (params) => {
      function handleChange(event) {
        // update the underlying data for the row
        params.api.updateRowData([{
          id: params.getValue('id'),
          selectedWarehouse: event.target.value,
        }]);
      }

      return (
        <Select
          onChange={handleChange}
          defaultValue={0}
          style={{ width: "100%" }}>
          {params.data.warehouses.map(({ location }, index) => {
            return (
              <MenuItem
                key={index}
                value={index}>
                {location}
              </MenuItem>);
          })}
        </Select>
      );
    },
  },
  {
    field: "quantity",
    description: "Stock per location",
    headerName: "Quantity",
    width: 150,
    headerClassName: "header",
    valueGetter: (params) => {
      const { selectedWarehouse, warehouses } = params.data
      return warehouses[selectedWarehouse].stock;
    },
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      const data1 = cellParams1.data;
      const data2 = cellParams2.data;

      const stock1 = data1.warehouses[data1.selectedWarehouse].stock;
      const stock2 = data2.warehouses[data2.selectedWarehouse].stock;

      return stock1 - stock2;
    }
  },
];

const rows = {
  "VISTAALEGRE": {
    "description": "Oporto Port - Fortified Wine",
    "minStock": 30,
    "maxStock": 130,
    "totalStock": 40,
    "warehouses": {
      "A3B": {
        "stock": 30
      },
      "D0": {
        "stock": 0
      },
      "D1": {
        "stock": 10
      }
    }
  },
  "SYRAH": {
    "description": "Lisboa Red Wine",
    "minStock": 50,
    "maxStock": 300,
    "totalStock": 35,
    "warehouses": {
      "A1C": {
        "stock": 20
      },
      "D0": {
        "stock": 15
      },
      "D1": {
        "stock": 0
      }
    }
  },
  "CHATEAULATOUR": {
    "description": "French Red Wine 75cl",
    "minStock": 5,
    "maxStock": 20,
    "totalStock": 0,
    "warehouses": {
      "A4D": {
        "stock": 0
      },
      "D0": {
        "stock": 0
      },
      "D1": {
        "stock": 0
      }
    }
  },
  "TERRANTEZ": {
    "description": "Madeira Dessert Wine",
    "minStock": 5,
    "maxStock": 60,
    "totalStock": 0,
    "warehouses": {
      "A4A": {
        "stock": 0
      },
      "D0": {
        "stock": 0
      },
      "D1": {
        "stock": 0
      }
    }
  },
  "QUINTACARDO": {
    "description": "Beira Interior White Wine",
    "minStock": 30,
    "maxStock": 300,
    "totalStock": 0,
    "warehouses": {
      "A2B": {
        "stock": 0
      },
      "D0": {
        "stock": 0
      },
      "D1": {
        "stock": 0
      }
    }
  },
  "JP": {
    "description": "Setúbal White Wine",
    "minStock": 15,
    "maxStock": 150,
    "totalStock": 0,
    "warehouses": {
      "A2A": {
        "stock": 0
      },
      "D0": {
        "stock": 0
      },
      "D1": {
        "stock": 0
      }
    }
  },
};

function parseRows() {
  let values = Object.entries(rows).map(([id, info]) => {
    info['id'] = id;
    info['selectedWarehouse'] = 0;
    return info;
  });

  let parsedRows = values.map((obj) => {
    let newWarehouses = Object.entries(obj.warehouses).map(([warehouse, info]) => {
      info['location'] = warehouse;
      return info
    });
    obj.warehouses = newWarehouses;
    return obj;
  })

  return parsedRows;
}

let parsedRows = parseRows();

function ListInventory() {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <DataGrid
        onClick={(ev) => { ev.preventDefault() }}
        autoHeight
        className={classes.tables}
        rows={parsedRows}
        columns={columns.map((column) => ({
          ...column,
          disableClickEventBubbling: true,
        }))}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
}

export default ListInventory;
