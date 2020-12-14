import React, { useState, useContext } from "react";
import { sendRequest } from "../requests.js";
import { Redirect, useHistory } from "react-router-dom";
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
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Row from "../components/StockRows";

import { useAuth } from "../statemanagement/AuthenticationContext.js";
import { StockContext } from "../statemanagement/StockContext";
import { StockInventoryContext } from "../statemanagement/StockInventoryContext";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ListOders({ rows }) {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [checked] = useContext(StockContext);
  const { setAuthToken } = useAuth();
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useContext(StockInventoryContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleButton = () => {
    if (checked.length != rows.length) {
      setOpen(true);
    } else {
      let send = rows.map((row) => {
        let item = {
          sourceDocKey: row.documentId,
          sourceDocLineNumber: row.sourceDocLineNumber,
          quantity: quantity.toString(),
        };
        return item;
      });
      sendRequest(
        "POST",
        "http://localhost:8800/api/supplier/delivery",
        send,
        localStorage.getItem("token")
      )
        .then((data) => {
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (flag) return <Redirect to="/" />;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let i = 0;
  return (
    <div>
      {rows.length === 0 ? (
        <CircularProgress className={classes.progress} color="inherit" />
      ) : (
        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Please make sure you select all the items before confirming!
            </Alert>
          </Snackbar>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.list}>
            <Paper className={classes.root}>
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow className={classes.header}>
                      <TableCell> Stocked</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>ProductId</TableCell>
                      <TableCell>DocumentId</TableCell>
                      <TableCell> Ordered Quantity</TableCell>
                      <TableCell>Stored Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <Row key={i++} row={row} />
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
                Confirm
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
