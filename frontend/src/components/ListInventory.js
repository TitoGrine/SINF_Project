import React from "react";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

import inventoryStyle from "../style/inventoryStyle.js";
import { MenuItem, Select, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(inventoryStyle);

const columns = [
  {
    field: "id",
    headerName: "Product ID",
    headerAlign: "center",
    width: 250,
    headerClassName: "header",
  },
  {
    field: "description",
    flex: 1,
    headerName: "Description",
    headerAlign: "center",
    headerClassName: "header",
  },
  {
    field: "totalStock",
    headerName: "Stock",
    headerAlign: "center",
    width: 150,
    headerClassName: "header",
  },
  {
    field: "location",
    headerName: "Zone",
    headerAlign: "center",
    sortable: false,
    disableClickEventBubbling: true,
    width: 150,
    headerClassName: "header",
    renderCell: (params) => {
      function handleChange(event) {
        // update the underlying data for the row
        params.api.updateRowData([
          {
            id: params.getValue("id"),
            selectedWarehouse: event.target.value,
          },
        ]);
      }

      return (
        <Select
          onChange={handleChange}
          value={params.data.selectedWarehouse}
          style={{ width: "100%" }}
        >
          {params.data.warehouses.map(({ location }, index) => {
            return (
              <MenuItem key={index} value={index}>
                {location}
              </MenuItem>
            );
          })}
        </Select>
      );
    },
  },
  {
    field: "quantity",
    description: "Stock per location",
    headerName: "Quantity",
    headerAlign: "center",
    width: 150,
    headerClassName: "header",
    valueGetter: (params) => {
      const { selectedWarehouse, warehouses } = params.data;
      return warehouses[selectedWarehouse].stock;
    },
    sortComparator: (v1, v2, cellParams1, cellParams2) => {
      const data1 = cellParams1.data;
      const data2 = cellParams2.data;

      const stock1 = data1.warehouses[data1.selectedWarehouse].stock;
      const stock2 = data2.warehouses[data2.selectedWarehouse].stock;

      return stock1 - stock2;
    },
  },
];

function ListInventory({ rows, isDataReady }) {
  const classes = useStyles();
  const rowsPerPage = 8;

  return (
    <div className={classes.table}>
      {rows.length === 0 && !isDataReady ? (
        <CircularProgress className={classes.progress} color="inherit" />
      ) : (
        <DataGrid
          onClick={(ev) => {
            ev.preventDefault();
          }}
          autoHeight
          rows={rows}
          columns={columns.map((column) => ({
            ...column,
            disableClickEventBubbling: true,
          }))}
          pageSize={rowsPerPage}
          disableSelectionOnClick
        />
      )}
    </div>
  );
}

export default ListInventory;
