import React, { useState, useContext } from "react";
import { getData } from "../requests.js";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import { OrderContext } from "../statemanagement/OrderContext";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    order: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        expected_quantity: PropTypes.number,
        quantity: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function Row(props) {
  const { row, type } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [data, setData] = useState(row);
  const [rowsSelected, setrowsSelected] = useContext(OrderContext);
  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

  async function getRow(order_ref, documentId) {
    if (data.order[0].description !== "") {
      setOpen(!open);
      return;
    }
    getData(
      "GET",
      "http://localhost:8800/api/" + type + "/orders/" + order_ref,
      localStorage.getItem("token")
    )
      .then((d) => {
        let values = [];
        let keysName = Object.keys(d);
        keysName.forEach((name) => {
          let obj = {
            documentId: documentId,
            lineNumber: d[name].lineNumber,
            productId: name,
            description: d[name].description,
            location: d[name].location,
            quantity: d[name].quantity,
            expected_quantity: d[name].quantity,
            stock: d[name].stock,
            checked: false,
          };
          values.push(obj);
        });
        data.order = values;
        setOpen(!open);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClick = (event, row_add, ref, input) => {
    const selectedIndex = selected.indexOf(row_add.productId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row_add.productId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    let new_data = data.order.map((value) => {
      if (row_add.checked) {
        row_add.order_ref = ref;
      }
      if (value.productId === row_add.productId) {
        value.expected_quantity = parseInt(input);
        value.checked = !row_add.checked;
      }
      return value;
    });
    let aux = data;
    aux.order = new_data;
    setData(aux);
    if (!row_add.checked) {
      let aux = rowsSelected.filter(function (item) {
        return item.productId !== row_add.productId;
      });
      setrowsSelected(aux);
      return;
    }
    rowsSelected.push(row_add);
  };

  const handleInput = (row_add, input) => {
    let new_data = data.order.map((value) => {
      if (value.productId === row_add.productId) {
        value.expected_quantity = parseInt(input);
      }
      return value;
    });
    let aux = data;
    aux.order = new_data;
    setData(aux);
    if (row_add.checked) {
      let aux = rowsSelected.filter(function (item) {
        return item.productId !== row_add.productId;
      });
      aux.push(row_add);
      setrowsSelected(aux);
      return;
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.row}>
        <TableCell className={classes.cell}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              getRow(row.order_ref, row.documentId);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.cell}>{data.client}</TableCell>
        <TableCell className={classes.cell}>{data.documentId}</TableCell>
        <TableCell className={classes.cell}>{data.name}</TableCell>
        <TableCell className={classes.cell}>{data.date}</TableCell>
      </TableRow>
      <TableRow className={classes.subTable}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table>
                <TableHead className={classes.subtablehead}>
                  <TableRow className={classes.subtablerow}>
                    <TableCell className={classes.cell}> </TableCell>
                    <TableCell className={classes.cell}>
                      {" "}
                      <b>ProductId</b>{" "}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <b>Description</b>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <b>Location</b>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <b>Quantity</b>
                    </TableCell>
                    {type === "supplier" && (
                      <TableCell className={classes.cell}>
                        <b>Expected Quantity</b>
                      </TableCell>
                    )}
                    <TableCell className={classes.cell}>
                      {" "}
                      <b>Stock</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.order.map((historyRow) => {
                    const isItemSelected = isSelected(historyRow.productId);
                    let value = 0;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={historyRow.productId}
                      >
                        <TableCell className={classes.cell} padding="checkbox">
                          <Checkbox
                            onClick={(event) => {
                              handleClick(
                                event,
                                historyRow,
                                data.order_ref,
                                value
                              );
                            }}
                            color="primary"
                            checked={isItemSelected}
                          />
                        </TableCell>
                        <TableCell className={classes.cell} scope="row">
                          {historyRow.productId}
                        </TableCell>
                        <TableCell className={classes.cell} scope="row">
                          {historyRow.description}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {historyRow.location}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {historyRow.quantity}
                        </TableCell>
                        {type === "supplier" && (
                          <TableCell className={classes.cell}>
                            <TextField
                              label="Number"
                              type="number"
                              onChange={(e) => {
                                value = e.target.value;
                                handleInput(historyRow, value);
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                min: 0,
                                max: historyRow.quantity,
                              }}
                            />
                          </TableCell>
                        )}
                        <TableCell className={classes.cell}>
                          {historyRow.stock}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
