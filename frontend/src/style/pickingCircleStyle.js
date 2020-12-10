import { darkred, beige, grey } from "./colors.js";

const pickingCircleStyle = {
  normal: {
    width: "3rem",
    height: "3rem",
    lineHeight: "3rem",
    margin: "0 2rem",
    border: "solid 5px " + darkred,
    borderRadius: "50%",
    padding: 15,
    textAlign: "center",
    position: "relative",
    display: "inline-block",
    zIndex: "2",
    background: darkred,
    color: beige,
    transition: "all .25s ease",
  },
  active: {
    width: "4.5rem",
    height: "4.5rem",
    lineHeight: "4.5rem",
    background: beige,
    color: darkred,
  },
  disabled: {
    background: grey,
    color: beige,
    borderColor: grey,
  },
  normalBefore: {
    content: "",
    position: "absolute",
    top: "2.5rem",
    left: "-4rem",
    width: "8rem",
    height: "5px",
    background: darkred,
    zIndex: "1",
    transition: "all .25s ease",
  },
  activeBefore: {
    top: "3.2rem",
  },
  disabledBefore: {
    background: grey,
  },
  noBefore: {
    display: "none",
  },
};

export default pickingCircleStyle;
