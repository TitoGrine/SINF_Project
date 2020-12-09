import { darkred, beige } from "./colors.js";

const orderStyle = {
  title: {
    color: darkred,
    fontSize: "1.15em",
    fontWeight: "200",
    paddingLeft: "2em",
  },
  root:{
    backgroundColor: beige,
    fontSize:"1.25em"
  },
  list: {
    height: "22em",
  },
  
  GnrBtn: {
    marginRight: "4em",
    color: beige,
    backgroundColor: darkred,
  },
  buttonwrp: {
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
