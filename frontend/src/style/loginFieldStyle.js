import { darkred, beige} from "./colors";


const loginFieldStyle = () => {
    const style = {
      textFieldStyle: {
        backgroundColor: darkred,
      },
      labelStyle: {
        marginLeft: ".2rem",
        color: darkred,
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
        color: beige,
      },
    };
  
    return style;
  };
  
  export default loginFieldStyle;