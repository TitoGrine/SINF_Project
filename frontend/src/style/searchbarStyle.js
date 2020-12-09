import { darkred } from "../style/colors";

const searchbarStyle = (theme) => ({
  label: {
    marginRight: ".8rem",
    color: darkred,
  },
  inputRoot: {
    position: "relative",
    top: "-3px",
    height: 44,
    paddingLeft: "1rem",
    paddingRight: ".5rem",
    border: "rgba(91, 0, 18, 0.5) solid 1px",
    borderRadius: theme.shape.borderRadius,
    transition: "border-color .25s ease-in-out, box-shadow .25s ease-in-out",
    "&:hover": {
      border: darkred + " solid 1px",
      boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
    },
  },
  searchIcon: {
    color: darkred,
  },
});

export default searchbarStyle;
