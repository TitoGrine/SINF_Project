// Just to clarify, I needed the 'theme' parameter for breakpoints
// so I turned this json const into a function that ends up by returning the json
import { darkred, beige } from "./colors";

const homePageStyle = (theme) => ({
  mainDiv: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  card: {
    backgroundColor: beige,
    [theme.breakpoints.up("md")]: {
      height: "80vh",
    },
  },
  btnMenu: {
    width: "100%",
  },
  logoutBtn: {
    fontFamily: "'PT Sans Narrow', sans-serif",
    fontSize: "1.5rem",
    textTransform: "none",
    textDecoration: "underline",
    color: darkred,
  },
  title: {
    margin: 0,
    color: darkred,
  },
});

export default homePageStyle;
