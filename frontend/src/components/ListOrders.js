import React, { useState, useEffect } from "react";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

import AddIcon from "@material-ui/icons/Add";

import orderStyle from "../style/orderStyle.js";
import { getData } from "../requests.js";
import { useAuth } from "../statemanagement/AuthenticationContext.js";

const useStyles = makeStyles(orderStyle);

function getColumns(type) {
  return [
    {
      field: "id",
      headerName: type.charAt(0).toUpperCase() + type.slice(1),
      width: 100,
      headerClassName: "header",
    },
    {
      field: "documentId",
      width: 180,
      headerName: "Document Id",
      headerClassName: "header",
    },
    {
      field: type + "Name",
      width: 450,
      headerName: type.charAt(0).toUpperCase() + type.slice(1) + " Name",
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
}

export default function ListOrders({ type }) {
  useEffect(() => {
    setRows([]);
    getOrders();
  }, [type]);

  const [orders, setOrders] = useState(); //to link order to order id
  const [rows, setRows] = useState([]); //to represent rows on render
  const { setAuthToken } = useAuth();

  async function getOrders() {
    getData(
      "GET",
      "http://localhost:8800/api/" + type + "/orders",
      localStorage.getItem("token")
    )
      .then((data) => {
        let keysName;
        let orders = [];
        let rows_aux = [];
        let i = 0;
        setOrders(data);
        keysName = Object.keys(data);
        keysName.forEach((name) => {
          if (type === "client") {
            data[name].id = data[name].client; //TODO pass id instead of client
            delete data[name].client;
          } else {
            data[name].id = data[name].supplier; //TODO pass id instead of client
            delete data[name].supplier;
          }
          data[name].info = i++;
          orders.push([name, data[name]]);
          rows_aux.push(data[name]);
        });
        setOrders(orders);
        setRows(rows_aux);
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        if (error.status === 401) setAuthToken("");
      });
  }

  const classes = useStyles();

  return (
    <div className={classes.table}>
      {rows.length === 0 ? (
        <CircularProgress className={classes.progress} color="inherit" />
      ) : (
        <DataGrid
          onClick={(ev) => {
            ev.preventDefault();
          }}
          autoHeight
          className={classes.tables}
          rows={rows}
          columns={getColumns(type).map((column) => ({
            ...column,
            disableClickEventBubbling: true,
          }))}
          pageSize={10}
          checkboxSelection
        />
      )}
    </div>
  );
}
