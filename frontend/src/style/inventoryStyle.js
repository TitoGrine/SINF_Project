import { darkred } from "./colors.js";

const inventoryStyle = {
  title: {
    color: darkred,
    fontSize: "1.15em",
    paddingLeft: "2em",
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
    padding: "0em 2em",
  },
  progress: {
    margin: "2em auto",
    display: "flow-root",
  },
};

export default inventoryStyle;