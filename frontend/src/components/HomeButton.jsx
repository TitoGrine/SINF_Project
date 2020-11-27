import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class HomeButton extends Component {
  circleSize = 150;

  circleStyle = {
    backgroundColor: "#5B0012",
    borderRadius: "50%",
    width: this.circleSize,
    height: this.circleSize,
    verticalAlign: "middle",
    textAlign: "center",
    display: "table-cell",
  };

  imgStyle = {
    filter:
    "invert(68%) sepia(34%) saturate(436%) hue-rotate(354deg) brightness(94%) contrast(86%)",
    display: "block",
    margin: "0 auto",
  };

  render() {
    return (
      <Button variant="text" style={{ backgroundColor: 'transparent' }} disableRipple>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <div style={this.circleStyle}>
              <img
                src={'./assets/' + this.props.image}
                alt={this.props.image}
                height="80px"
                width="80px"
                style={this.imgStyle}
              />
            </div>
          </Grid>
          <Grid item>
            <p>{this.props.name}</p>
          </Grid>
        </Grid>
      </Button>
    );
  }
}

export default HomeButton;
