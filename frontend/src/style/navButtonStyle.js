import { beige } from "./colors";

const navButtonStyle = {
  circle: {
    backgroundColor: beige,
    borderRadius: "1000px",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  iconImg: {
    width: "40px",
    height: "40px",
    filter:
      "invert(5%) sepia(91%) saturate(5824%) hue-rotate(342deg) brightness(87%) contrast(103%)",
    display: "block",
    margin: "0 auto",
  },
};

export default navButtonStyle;
