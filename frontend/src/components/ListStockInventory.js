import React, { useState, useContext } from "react";
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

import Row from "../components/StockRows";

import { useAuth } from "../statemanagement/AuthenticationContext.js";
import { StockContext } from "../statemanagement/StockContext";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

export default function ListOders() {
  const classes = useStyles();

  const [rows] = useState([
    {
      id: 0,
      location: "A10",
      productId: "A10",
      documentId: "A10",
      orderedquantity: "A10",
      storedquantity: "A10",
    },
    {
      id: 1,
      location: "A3",
      productId: "A3",
      documentId: "A3",
      orderedquantity: "A3",
      storedquantity: "A3",
    },
    {
      id: 2,
      location: "A5",
      productId: "A5",
      documentId: "A5",
      orderedquantity: "A5",
      storedquantity: "A5",
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [checked] = useContext(StockContext);
  const { setAuthToken } = useAuth();

  const handleButton = () => {
    console.log(checked);
  };

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
