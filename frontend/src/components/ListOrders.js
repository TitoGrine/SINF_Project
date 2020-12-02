import React, { useState } from "react";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

const columns = [
  {
    field: "id",
    headerName: "Client",
    width: 100,
    headerClassName: "header",
  },
  {
    field: "documentID",
    width: 180,
    headerName: "Document ID",
    headerClassName: "header",
  },
  {
    field: "clientName",
    width: 450,
    headerName: "Client Name",
    headerClassName: "header",
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    headerClassName: "header",
  },
  {
    field: "info",
    headerName: "Info",
    width: 100,
    headerAlign: "center",
    headerClassName: "header",
    renderCell: (params) => {
      const onClick = () => {
        return alert(params.value);
      };

      return (
        <IconButton onClick={onClick} aria-label="delete">
          <AddIcon />
        </IconButton>
      );
    },
  },
];

const rows = [
  {
    id: "C0011",
    documentID: "1",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "1"
  },
  {
    id: "C0012",
    documentID: "2",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "2"
  },
  {
    id: "C0013",
    documentID: "3",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "3"
  },
  {
    id: "C0014",
    documentID: "4",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "4"
  },
  {
    id: "C0015",
    documentID: "5",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "5"
  },
  {
    id: "C0016",
    documentID: "6",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "6"
  },
  {
    id: "C0017",
    documentID: "7",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "7"
  },
  {
    id: "C0018",
    documentID: "8",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "8"
  },
  {
    id: "C0019",
    documentID: "9",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "9"
  },
  {
    id: "C0020",
    documentID: "5",
    orderID: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "10"
  },
  {
    id: "C0021",
    documentID: "6",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "11"
  },
  {
    id: "C0022",
    documentID: "7",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "12"
  },
  {
    id: "C0023",
    documentID: "8",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "13"
  },
  {
    id: "C0024",
    documentID: "9",
    clientName: "Marisqueira Antiga",
    date: "23-11-2020",
    info: "14"
  },
];


export default function DataTable() {

  const [orders, setOrders] = useState();

  const classes = useStyles();
  return (
    <div className={classes.table}>
      <DataGrid
        onClick = { (ev) => {ev.preventDefault()}}
        autoHeight
        className={classes.tables}
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          disableClickEventBubbling: true,
        }))}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
