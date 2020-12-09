import React, { useContext, useState, useEffect } from "react";
import { getData } from "../requests.js";
//material core
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

//state management
import { ModalContext } from "../statemanagement/ModalContext";
import { OrderContext } from "../statemanagement/OrderContext";

import orderModalStyle from "../style/orderModalStyle.js";

const useStyles = makeStyles(orderModalStyle);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const columns = [
  {
    field: "id",
    headerName: "Product Id",
    width: 100,
    headerClassName: "header",
  },
  {
    field: "description",
    width: 300,
    headerName: "Description",
    headerClassName: "header",
  },
  {
    field: "quantity",
    width: 100,
    headerName: "Quantity",
    headerClassName: "header",
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
    headerClassName: "header",
  },
  {
    field: "location",
    headerName: "Location",
    width: 200,
    headerAlign: "center",
    headerClassName: "header",
  },
];

export default function CustomizedDialogs({ id, type }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [visible, setVisible] = useContext(ModalContext);
  const [selection, setSelection] = useState([]);
  const [rowsSelected, setrowsSelected] = useContext(OrderContext);

  const handleClose = () => {
    setVisible(false);
  };

  const handleButton = () => {
    selection.forEach((select) => {
      let aux = rowsSelected;
      aux.push(rows[select]);
      setrowsSelected(aux);
    });
  };

  useEffect(() => {
    getOrderData();
  }, [id]);

  async function getOrderData() {
    getData(
      "GET",
      "http://localhost:8800/api/" + type + "/orders/" + id,
      localStorage.getItem("token")
    )
      .then((data) => {
        let keysName;
        let rows_aux = [];
        let i = 0;
        keysName = Object.keys(data);
        keysName.forEach((name) => {
          data[name].id = i++;
          data[name].productId = name;
          rows_aux.push(data[name]);
        });
        setRows(rows_aux);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Dialog className={classes.dialog} open={visible} onClose={handleClose}>
        <DialogTitle className={classes.title}>
          {"Order "} <b>{id}</b>{" "}
        </DialogTitle>
        <DialogContent className={classes.content}>
          {rows.length == 0 ? (
            <CircularProgress className={classes.progress} color="inherit" />
          ) : (
            <div className={classes.table}>
              <DataGrid
                onClick={(ev) => {
                  ev.preventDefault();
                }}
                rows={rows}
                columns={columns.map((column) => ({
                  ...column,
                  disableClickEventBubbling: true,
                }))}
                pageSize={5}
                checkboxSelection
                onSelectionChange={(newSelection) => {
                  setSelection(newSelection.rowIds);
                }}
              />
            </div>
          )}
          {rows.length !== 0 && (
            <Button
              onClick={handleButton}
              className={classes.GnrBtn}
              variant="contained"
            >
              Add products to route
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
