import { darkred, beige } from "./colors.js";

const orderModalStyle = {
  tables: {
    height: "20em",
    width: "30em",
  },
  content: {
    height: "20em",
    width: "30em",
  },
  dialog: {
    " & .MuiDialog-paper": {
      backgroundColor: beige,
    },
    " & .MuiDialog-paperWidthSm": {
      maxWidth: "60%",
    },
  },
};

export default orderModalStyle;
