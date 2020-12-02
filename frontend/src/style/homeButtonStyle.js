import { darkred } from "../style/colors";

const homeButtonStyle = (theme) => ({
  iconCircle: {
    backgroundColor: darkred,
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      width: 70,
      height: 70,
    },
    [theme.breakpoints.up("sm")]: {
      width: 150,
      height: 150,
    },
    verticalAlign: "middle",
    textAlign: "center",
    display: "table-cell",
    transition: "box-shadow .25s ease-in-out",
  },

  iconImg: {
    width: "52%",
    height: "52%",
    filter:
      "invert(68%) sepia(34%) saturate(436%) hue-rotate(354deg) brightness(94%) contrast(86%)",
    display: "block",
    margin: "0 auto",
  },

  btnText: {
    fontFamily: "'PT Sans Narrow', sans-serif",
    fontSize: "1.5rem",
    textTransform: "none",
    color: darkred,
  },

  btnGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      justifyContent: "baseline",
      alignItems: "center",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export default homeButtonStyle;
