import { beige } from "./colors";


const loginFormStyle = (theme) => {
  const style = {
    container: {
      height: "100vh",
      backgroundColor: beige,
    },
    formContainer: {
      height: "100%",
      marginRight: "auto",
      marginLeft: "auto",
      [theme.breakpoints.down("lg")]: {
        width: "80%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "60%",
      },
      [theme.breakpoints.only("xs")]: {
        marginRight: "auto",
        marginLeft: "auto",
      },
    },
    title: {
        marginBottom: "5rem",
        [theme.breakpoints.only("xs")]: {
            marginBottom: "3rem",
        }
    },
    middleItems: {
      width: "100%",
      marginBottom: "2rem",
    },
  };

  return style;
};

export default loginFormStyle;
