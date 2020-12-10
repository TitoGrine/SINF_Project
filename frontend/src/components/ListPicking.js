import React from "react";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

import orderStyle from "../style/orderStyle.js";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(orderStyle);

const columns = [
  {
    field: "ref",
    headerName: "Product ID",
    headerAlign: "center",
    width: 340,
    headerClassName: "header",
    disableClickEventBubbling: true,
  },
  {
    field: "order_ref",
    headerName: "Order",
    headerAlign: "center",
    width: 250,
    headerClassName: "header",
    disableClickEventBubbling: true,
  },
  {
    field: "quantity",
    headerName: "Ordered Quantity",
    headerAlign: "center",
    width: 220,
    headerClassName: "header",
    disableClickEventBubbling: true,
  },
  {
    field: "picked_quantity",
    headerName: "Picked Quantity",
    headerAlign: "center",
    sortable: false,
    width: 220,
    headerClassName: "header",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      function handleChange(ev) {
        console.log(ev.target.value);
      }

      return (
          <TextField
            type="number"
            onChange={handleChange}
            style={{ width: "80%", margin: "auto" }}
          />
      );
    },
  },
];

function ListPicking({ rows }) {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default ListPicking;
