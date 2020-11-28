// Just to clarify, I needed the 'theme' parameter for breakpoints
// so I turned this json const into a function that ends up by returning the json
function homePageStyle(theme) {
  const style = {
    mainDiv: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#CAA472",
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
      color: "#5B0012",
    },
  };

  return style;
}

export default homePageStyle;
