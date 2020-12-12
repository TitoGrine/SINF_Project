import { darkred, beige } from "./colors.js";

const pickingStyle = {
  title: {
    color: darkred,
    fontSize: "1.15em",
    paddingLeft: "2em",
  },
  list: {
    marginBottom: "1rem",
  },
  pickingCircles: {
    minHeight: 150,
    textAlign: "center",
    margin: "2rem 0",
    overflow: "auto",
    whiteSpace: "nowrap",
  },
  button: {
    marginRight: "1rem",
    color: beige,
    backgroundColor: darkred,
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default pickingStyle;
