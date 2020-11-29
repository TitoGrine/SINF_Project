import React from "react";
import { useHistory } from "react-router-dom";
//material core
import Button from "@material-ui/core/Button";
//components
import HomeButton from "./HomeButton.js";
import NavButton from "./NavButton.js";

function getButtonType(name, image, type) {
  if (type === "home")
    return <HomeButton name={name} image={image}></HomeButton>;
  else if (type === "nav")
    return <NavButton name={name} image={image}></NavButton>;
}

function getPath(name) {
  return "/" + name.toLowerCase().replace(/\s/g, "-");
}

function BaseButton({ name, image, type }) {
  const history = useHistory();

  const handleMouseEnter = (ev) => {
    const circle = ev.currentTarget.getElementsByClassName("icon-circle")[0];
    if (circle !== undefined)
      circle.style["boxShadow"] = "0 0 20px 0 rgba(0,0,0,0.5)";
  };

  const handleMouseLeave = (ev) => {
    const circle = ev.currentTarget.getElementsByClassName("icon-circle")[0];
    if (circle !== undefined) circle.style["boxShadow"] = "none";
  };

  const routeChange = () => {
    if (name == null) return;
    let path = getPath(name);
    history.push(path);
  };

  return (
    <Button
      variant="text"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: "transparent", width: "100%" }}
      disableRipple
      onClick={routeChange}
    >
      {getButtonType(name, image, type)}
    </Button>
  );
}

export default BaseButton;
