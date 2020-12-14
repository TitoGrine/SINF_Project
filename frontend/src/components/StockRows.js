import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import orderStyle from "../style/orderStyle.js";
import TextField from "@material-ui/core/TextField";

import { StockContext } from "../statemanagement/StockContext";
import { StockInventoryContext } from "../statemanagement/StockInventoryContext";

const useStyles = makeStyles(orderStyle);

Row.propTypes = {
  row: PropTypes.shape({
    location: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired,
    orderedquantity: PropTypes.string.isRequired,
    storedquantity: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Row(props) {
  const { row } = props;
  const classes = useStyles();
  const [checked, setChecked] = useContext(StockContext);
  const [isSelected, setSelected] = useState(false);
  const [quantity, setQuantity] = useContext(StockInventoryContext);
  const [error, setError] = useState(false);
  const initialQnt = row.storedquantity;

  const handleChecked = (id) => {
    let newChecked = [];
    if (isSelected) {
      newChecked = checked.filter((value) => value !== id);
    } else {
      newChecked = checked;
      newChecked.push(id);
    }
    setChecked(newChecked);
    setSelected(!isSelected);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.row}>
        <TableCell className={classes.cell}>
          <Checkbox
            color="primary"
            onClick={() => {
              handleChecked(row.id.toString());
            }}
            checked={isSelected}
          ></Checkbox>
        </TableCell>
        <TableCell className={classes.cell}>{row.location}</TableCell>
        <TableCell className={classes.cell}>{row.productId}</TableCell>
        <TableCell className={classes.cell}>{row.documentId}</TableCell>
        <TableCell className={classes.cell}>{row.orderedquantity}</TableCell>
        <TableCell className={classes.cell}>
          <TextField
            value={quantity[row.id] || ''}
            id="standard-number"
            label="Number"
            type="number"
            onChange={(e) => {
              if (e.target.value > initialQnt || e.target.value < 0) {
                let aux = [...quantity];
                aux[row.id] = initialQnt;
                setQuantity(aux);
              } else {
                let aux = [...quantity];
                aux[row.id] = e.target.value;
                setQuantity(aux);
              }
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
