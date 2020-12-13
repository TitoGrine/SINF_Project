import React, { useEffect, useState, useContext } from "react";
import { getData, getToken, sendRequest } from "../requests.js";
import { useHistory, Redirect } from "react-router-dom";
//material@core
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Row from "../components/Rows";

import { OrderContext } from "../statemanagement/OrderContext";
import { useAuth } from "../statemanagement/AuthenticationContext.js";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

export default function ListOders({ type }) {
  const [rowsSelected, setrowsSelected] = useContext(OrderContext);
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [flagClient, setFlagClient] = useState(false);
  const history = useHistory();

  const { setAuthToken } = useAuth();

  useEffect(() => {
    getOrders();
  }, [type]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  async function getOrders() {
    getData(
      "GET",
      "http://localhost:8800/api/" + type + "/orders",
      localStorage.getItem("token")
    )
      .then((data) => {
        let keysName;
        let orders = [];
        keysName = Object.keys(data);
        orders = keysName.map((name) => {
          let value_type =
            type === "client" ? data[name].client : data[name].supplier;
          let name_value =
            type === "client" ? data[name].clientName : data[name].supplierName;
          let date = data[name].date;
          let obj = {
            client: value_type,
            name: name_value,
            documentId: data[name].documentId,
            date: date.substring(0, date.indexOf("T")),
            order: [
              {
                productId: "",
                description: "",
                location: "",
                quantity: 0,
                stock: 0,
                input: 0,
                checked: false,
              },
            ],
            order_ref: name,
          };
          return obj;
        });
        setRows(orders);
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        if (error.status === 401) setAuthToken("");
      });
  }

  const handleButton = () => {
    if (type === "client") {
      let aux = rowsSelected.map((obj) => {
        let item = {
          ref: obj.productId,
          quantity: obj.quantity,
          location: obj.quantity,
          order_ref: obj.order_ref,
        };
        return item;
      });
      let object = {
        date: Date.now(),
        items: aux,
      };
      sendRequest(
        "POST",
        "http://localhost:8800/api/picking-wave/create",
        object,
        localStorage.getItem("token")
      )
        .then((data) => {
          setFlagClient(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type === "supplier") {
      let prod = rowsSelected.map((obj) => {
        let item = {
          sourceDocKey: obj.documentId,
          sourceDocLineNumber: obj.lineNumber,
          quantity: obj.expected_quantity.toString(),
        };
        return item;
      });
      let i = 0;
      let sendpage = rowsSelected.map((obj) => {
        let item = {
          id: i++,
          documentId: obj.documentId,
          storedquantity: obj.expected_quantity.toString(),
          orderedquantity: obj.quantity.toString(),
          location: obj.location,
          productId: obj.productId,
        };
        return item;
      });
      sendRequest(
        "POST",
        "http://localhost:8800/api/supplier/delivery",
        prod,
        localStorage.getItem("token")
      )
        .then((data) => {
          history.push("/stock-inventory", { params: sendpage });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (flagClient) return <Redirect to="/" />;

  let i = 0;
  return (
    <div>
      {rows.length === 0 ? (
        <CircularProgress className={classes.progress} color="inherit" />
      ) : (
        <div>
          <Grid item className={classes.list}>
            <Paper className={classes.root}>
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow className={classes.header}>
                      <TableCell> More Info</TableCell>
                      <TableCell>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </TableCell>
                      <TableCell>DocumentId</TableCell>
                      <TableCell> Client Name</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <Row key={i++} type={type} row={row} />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[6]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Grid item className={classes.buttonwrp}>
              <Button
                onClick={handleButton}
                className={classes.GnrBtn}
                variant="contained"
              >
                Generate Route
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
