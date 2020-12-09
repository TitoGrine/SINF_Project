import { darkred, beige, darkbeige } from "./colors.js";

const orderStyle = {
  title: {
    color: darkred,
    fontSize: "1.15em",
    fontWeight: "200",
    paddingLeft: "2em",
  },
  root: {
    backgroundColor: darkbeige,
  },
  list: {
    width: "90%",
    margin: "auto",
  },
  header: {
    borderBottom: "4px solid" + darkred,
    "& .MuiTableCell-head": {
      color: darkred,
      fontSize: "0.75em",
      fontFamily: "'PT Sans Narrow', sans-serif",
    },
    "& .MuiTableCell-root": {
      fontSize: "0.85em",
      fontWeight: "bold",
      fontFamily: "'PT Sans Narrow', sans-serif",
    },
    "& .MuiTableRow-root": {
      borderStyle: "none",
    },
  },
  "& .MuiTableCell-root": {
    borderBottom: "1px solid" + beige,
  },
  GnrBtn: {
    marginRight: "4em",
    color: beige,
    backgroundColor: darkred,
  },
  buttonwrp: {
    marginTop:"1em",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  progress: {
    margin: "2em auto",
    display: "flow-root",
  },
};

export default orderStyle;
