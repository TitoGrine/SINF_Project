import React from "react";
import Button from "@material-ui/core/Button";

function imageButton({ image, name }) {

  return (
    <div>
      <Button>
        <img src={window.location.origin + '/assets/' + image} alt="grapes" height="80px" width="80px" />
        <p>{name}</p>
      </Button>
    </div>
  );
}


export default imageButton