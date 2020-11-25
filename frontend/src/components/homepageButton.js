import React from "react";

import Button from "@material-ui/core/Button";


export default function homepageButton({ image, name }) {

  return (
    <div>
      <Button>
        <img src={window.location.origin + '/assets/grape.svg'} alt="grapes" height="200px" width="200px" />
        <p>{name}</p>
      </Button>
    </div>
  );
}
