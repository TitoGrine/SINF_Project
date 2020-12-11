import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import orderStyle from "../style/orderStyle.js";

const useStyles = makeStyles(orderStyle);

Row.propTypes = {
  row: PropTypes.shape({
    location: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired,
    orderedquantity: PropTypes.number.isRequired,
    storedquantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default function Row(props) {
  const { row } = props;
  const classes = useStyles();
  const [isSelected, setSelected] = useState(false);

  return (
    <React.Fragment>
      <TableRow className={classes.row}>
        <TableCell className={classes.cell}>
          <Checkbox checked={isSelected}></Checkbox>
        </TableCell>
        <TableCell className={classes.cell}>{row.client}</TableCell>
        <TableCell className={classes.cell}>{row.documentId}</TableCell>
        <TableCell className={classes.cell}>{row.name}</TableCell>
        <TableCell className={classes.cell}>{row.date}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}
