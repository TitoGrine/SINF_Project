import * as React from "react";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

const columns = [
  {
    field: "id",
    headerName: "Client",
    headerAlign: "center",
    width: 100,
    headerClassName: "header",
  },
  {
    field: "documentID",
    width: 180,
    headerName: "Document ID",
    headerAlign: "center",
    headerClassName: "header",
  },
  {
    field: "orderID",
    width: 450,
    headerName: "Order ID",
    headerAlign: "center",
    headerClassName: "header",
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    headerAlign: "center",
    headerClassName: "header",
  },
  {
    field: "info",
    headerName: "Info",
    width: 100,
    headerAlign: "center",
    headerClassName: "header",
  },
];

const rows = [
  {
    id: "C0011",
    documentID: "1",
    orderID: "d7342a41-e4c1-b832-621f133061b6",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0012",
    documentID: "2",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0013",
    documentID: "3",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0014",
    documentID: "4",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0015",
    documentID: "5",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0016",
    documentID: "6",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0017",
    documentID: "7",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0018",
    documentID: "8",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0019",
    documentID: "9",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0020",
    documentID: "5",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0021",
    documentID: "6",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0022",
    documentID: "7",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0023",
    documentID: "8",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
  {
    id: "C0024",
    documentID: "9",
    orderID: "d7342a41-e4c1-b832-621f133061b",
    date: "23-11-2020",
    info: "+",
  },
];

export default function DataTable() {
  const classes = useStyles();
  return (
    <div className={classes.table}>
      <DataGrid
        autoHeight
        className={classes.tables}
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
