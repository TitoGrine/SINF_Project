import { darkred, beige } from "./colors.js";

const pickingStyle = {
  title: {
    color: darkred,
    fontSize: "1.15em",
    fontWeight: "200",
    paddingLeft: "2em",
  },
  list: {
    height: "calc(22em - 192px)",
  },
  pickingCircles: {
    height: 150,
    textAlign: "center",
    margin: "2rem 0",
  },
  button: {
    marginRight: "4em",
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
