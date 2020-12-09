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

import { OrderContext } from "../statemanagement/OrderContext";

import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

Row.propTypes = {
  row: PropTypes.shape({
    clientName: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    order: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function Row(props) {
  const { row, type } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [data, setData] = useState(row);
  const [rowsSelected, setrowsSelected] = useContext(OrderContext);

  async function getRow(order_ref) {
    if (data.order[0].description != "") {
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
            productId: name,
            description: d[name].description,
            quantity: d[name].quantity,
            stock: d[name].stock,
            location: d[name].location,
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

  const handleClick = (event, row_add, ref) => {
    if (row_add.checked) {
      row_add.checked = false;
      return;
    }
    row_add.order_ref = ref;
    row_add.checked = true;
    rowsSelected.push(row_add);
  };

  return (
    <React.Fragment >
      <TableRow >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              getRow(row.order_ref);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{data.client}</TableCell>
        <TableCell>{data.documentId}</TableCell>
        <TableCell>{data.clientName}</TableCell>
        <TableCell>{data.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.order.map((historyRow) => {
                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, historyRow, data.order_ref)
                        }
                        role="checkbox"
                        tabIndex={-1}
                        key={historyRow.productId}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={historyRow.checked} />
                        </TableCell>
                        <TableCell scope="row">
                          {historyRow.description}
                        </TableCell>
                        <TableCell>{historyRow.quantity}</TableCell>
                        <TableCell>{historyRow.stock}</TableCell>
                        <TableCell>{historyRow.location}</TableCell>
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
