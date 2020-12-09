import React, { useEffect, useState, useContext } from "react";
import { getData } from "../requests.js";
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
import Row from "../components/Rows";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

export default function ListOders({ type }) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

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
          let obj = {
            client: value_type,
            clientName: data[name].clientName,
            documentId: data[name].documentId,
            date: data[name].date,
            order: [
              {
                productId: "",
                description: "",
                quantity: 0,
                stock: 0,
                location: "",
                checked: false
              },
            ],
            order_ref: name,
          };
          return obj;
        });
        setRows(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let i = 0;
  return (
    <div className={classes.table}>
      {rows.length === 0 ? (
        <CircularProgress className={classes.progress} color="inherit" />
      ) : (
        <div>
          <Paper className={classes.root}>
            <TableContainer>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell> More Info</TableCell>
                    <TableCell>{type.charAt(0).toUpperCase() + type.slice(1)}</TableCell>
                    <TableCell>DocumentId</TableCell>
                    <TableCell> Client Name</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        </div>
      )}
    </div>
  );
}
