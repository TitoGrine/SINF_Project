import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class HomeButton extends Component {
  state = {
    circleStyle: {
      backgroundColor: "#5B0012",
      borderRadius: "50%",
      width: 150,
      height: 150,
      verticalAlign: "middle",
      textAlign: "center",
      display: "table-cell",
      transition: "all .2s ease-in-out",
    },
  };

  imgStyle = {
    filter:
      "invert(68%) sepia(34%) saturate(436%) hue-rotate(354deg) brightness(94%) contrast(86%)",
    display: "block",
    margin: "0 auto",
  };

  textStyle = {
    fontFamily: "'PT Sans Narrow', sans-serif",
    fontSize: "1.5rem",
    textTransform: "none",
    color: "#5B0012",
  };

  handleMouseEnter() {
    this.setState({
      circleStyle: {
        backgroundColor: "#5B0012",
        borderRadius: "50%",
        width: 150,
        height: 150,
        verticalAlign: "middle",
        textAlign: "center",
        display: "table-cell",
        transition: "all .2s ease-in-out",
        boxShadow: "0 0 20px 0 rgba(0,0,0,0.5)",
      },
    });
  }

  handleMouseLeave() {
    this.setState({
      circleStyle: {
        backgroundColor: "#5B0012",
        borderRadius: "50%",
        width: 150,
        height: 150,
        verticalAlign: "middle",
        textAlign: "center",
        display: "table-cell",
        transition: "all .2s ease-in-out",
      },
    });
  }

  render() {
    return (
      <Button
        variant="text"
        style={{ backgroundColor: "transparent" }}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        disableRipple
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <div style={this.state.circleStyle}>
              <img
                src={"./assets/" + this.props.image}
                alt={this.props.image}
                height="80px"
                width="80px"
                style={this.imgStyle}
              />
            </div>
          </Grid>
          <Grid item>
            <p style={this.textStyle}>{this.props.name}</p>
          </Grid>
        </Grid>
      </Button>
    );
  }
}

export default HomeButton;
