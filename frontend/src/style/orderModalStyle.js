import { darkred, beige } from "./colors.js";

const orderModalStyle = {
  title:{
    color: darkred,
    padding: "1.5em 0 0 2em",
    fontFamily: "'PT Sans Narrow', sans-serif",
  },
  content: {
    height: "20em",
    width: "35em",
  },
  dialog: {
    " & .MuiDialog-paper": {
      backgroundColor: beige,
    },
    " & .MuiDialog-paperWidthSm": {
      maxWidth: "60%",
    },
  },
  modal:{
    height: "20em",
    width: "30em"
  },
  table: {
    "& .header": {
      color: darkred,
      borderStyle: "none",
      fontFamily: "'PT Sans Narrow', sans-serif",
    },
    "& .MuiDataGrid-colCellTitle": {
      fontSize: "1.10em",
      fontWeight: "bold",
    },
    "& .MuiDataGrid-root .MuiDataGrid-cell": {
      textAlign: "center",
      border: "none",
    },
    "& .MuiDataGrid-root": {
      border: "none",
      fontSize: "0.75em",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-root .MuiDataGrid-columnsContainer": {
      borderBottom: "3px solid" + darkred,
    },
    height: "90%",
    padding: "0em 2em",
  },
  progress: {
    margin: "2em auto",
    display: "flow-root",
  },
  GnrBtn: {
    color: beige,
    backgroundColor: darkred,
  },
};

export default orderModalStyle;
