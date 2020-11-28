const loginFieldStyle = () => {
    const style = {
      textFieldStyle: {
        backgroundColor: "#5B0012",
      },
      labelStyle: {
        marginLeft: ".2rem",
      },
      notchedOutline: {
        borderWidth: "1px",
        borderColor: "transparent !important",
      },
      inputFocused: {
        boxShadow: "0 0 0 0.2rem rgba(91, 0, 18, 0.5)",
        transition: "box-shadow .25s ease-in-out",
      },
      inputColor: {
        color: "#CAA472",
      },
    };
  
    return style;
  };
  
  export default loginFieldStyle;