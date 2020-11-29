import { darkred, beige } from "./colors.js";

const orderStyle = {
  title: {
    color: darkred,
    fontSize: "1.15em",
    fontWeight: "200",
    paddingLeft: "2em",
  },
  list:{
    height: "22em"
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
    },
    "& .MuiDataGrid-root": {
      border: "none",
      fontSize: "0.75em"
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-root .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-root .MuiDataGrid-columnsContainer": {
      borderBottom: "3px solid" + darkred,
    },
    padding: "0em 2em",
  },
  GnrBtn: {
    marginRight: "4em",
    color: beige,
    backgroundColor: darkred,
  },
  buttonwrp:{
    width:"100%",
    display: "flex",
    justifyContent: "flex-end",
  }
};

export default orderStyle;
