import React, { useState, useContext, useEffect } from "react";
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
import { CircularProgress } from "@material-ui/core";

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
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    setData(row);
  }, [row]);

  async function getRow(order_ref, documentId) {
    setOpen(!open);
    if (data.order[0].description !== "") {
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
        let inpts = [];
        let i = 0;
        keysName.forEach((name) => {
          let obj = {
            id: i++,
            documentId: documentId,
            lineNumber: d[name].lineNumber,
            productId: name,
            description: d[name].description,
            line_number: d[name].lineNumber,
            location: d[name].location,
            quantity: d[name].quantity,
            expected_quantity:
              type === "client"
                ? Math.min(d[name].quantity, d[name].stock)
                : d[name].quantity,
            stock: d[name].stock,
            order_ref: data.order_ref,
            checked: false,
          };
          inpts[obj.id] = [
            type === "client"
              ? Math.min(d[name].quantity, d[name].stock)
              : d[name].quantity,
          ];
          values.push(obj);
        });
        setInputs(inpts);
        setData((prevData) => ({
          ...prevData,
          order: values,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClick = (event, row_add, input) => {
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
      if (value.productId === row_add.productId) {
        value.expected_quantity = parseInt(input);
        value.checked = !row_add.checked;
      }
      return value;
    });
    setData((prevData) => ({
      ...prevData,
      order: new_data,
    }));
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
    setData((prevData) => ({
      ...prevData,
      order: new_data,
    }));
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
              {data.order[0].description === "" ? (
                <CircularProgress
                  className={classes.progress}
                  color="inherit"
                />
              ) : (
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
                      <TableCell className={classes.cell}>
                        {type === "client" ? (
                          <b>Quantity To Pick</b>
                        ) : (
                          <b>Received Quantity</b>
                        )}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {" "}
                        <b>Stock</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.order.map((historyRow) => {
                      const isItemSelected = isSelected(historyRow.productId);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={historyRow.productId}
                        >
                          <TableCell
                            className={classes.cell}
                            padding="checkbox"
                          >
                            {historyRow.stock === 0 && type === "client" ? (
                              <Checkbox
                                onClick={(event) => {
                                  handleClick(
                                    event,
                                    historyRow,
                                    inputs[historyRow.id]
                                  );
                                }}
                                color="primary"
                                checked={isItemSelected}
                                disabled
                              />
                            ) : (
                              <Checkbox
                                onClick={(event) => {
                                  handleClick(
                                    event,
                                    historyRow,
                                    inputs[historyRow.id]
                                  );
                                }}
                                color="primary"
                                checked={isItemSelected}
                              />
                            )}
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
                          <TableCell className={classes.cell}>
                            <TextField
                              label="Number"
                              type="number"
                              value={inputs[historyRow.id]}
                              onChange={(e) => {
                                let maxVal =
                                  type === "client"
                                    ? Math.min(
                                        historyRow.quantity,
                                        historyRow.stock
                                      )
                                    : historyRow.quantity;
                                if (e.target.value > maxVal) {
                                  e.target.value = maxVal;
                                }
                                inputs[historyRow.id] = [
                                  parseInt(e.target.value),
                                ];
                                handleInput(historyRow, e.target.value);
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                inputProps: {
                                  min: 0,
                                  max:
                                    type === "client"
                                      ? Math.min(
                                          historyRow.quantity,
                                          historyRow.stock
                                        )
                                      : historyRow.quantity,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.cell}>
                            {historyRow.stock}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
