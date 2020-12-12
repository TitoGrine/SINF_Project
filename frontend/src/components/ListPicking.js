import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

import orderStyle from "../style/orderStyle.js";
import { useState } from "react";
import { TextField, Checkbox } from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles(orderStyle);

function ListPicking({ rows, onQuantityChange, onCheckboxChange }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    setPage(0);
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell align="center"> Picked</TableCell>
              <TableCell align="center"> Product ID</TableCell>
              <TableCell align="center"> Document Id</TableCell>
              <TableCell align="center"> Ordered Quantity</TableCell>
              <TableCell align="center"> Picked Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log("Rendering row " + row.id);
                return (
                  <TableRow hover key={row.id} className={classes.row}>
                    <TableCell
                      className={classes.cell}
                      style={{ padding: 0 }}
                      align="center"
                    >
                      <Checkbox
                        defaultChecked={row.picked}
                        onChange={(ev) =>
                          onCheckboxChange(row.id, ev.target.checked)
                        }
                        color="primary"
                      />
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      style={{ width: 340 }}
                      align="center"
                    >
                      {row.ref}
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      style={{ width: 250 }}
                      align="center"
                    >
                      {row.order_ref}
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      style={{ width: 220 }}
                      align="center"
                    >
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      style={{ width: 220, padding: 0 }}
                      align="center"
                    >
                      <TextField
                        type="number"
                        defaultValue={row.selected_quantity}
                        onChange={(ev) =>
                          onQuantityChange(row.id, ev.target.value)
                        }
                        style={{ width: "80%", margin: "auto" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={Math.min(page, Math.floor(rows.length / rowsPerPage))}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
}

export default ListPicking;
