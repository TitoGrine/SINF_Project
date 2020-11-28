import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import homeButtonStyle from "../style/homeButtonStyle.js";

const styles = homeButtonStyle;

class HomeButton extends Component {
  handleMouseEnter(ev) {
    const circle = ev.currentTarget.getElementsByClassName("icon-circle")[0];
    if (circle !== undefined)
      circle.style["boxShadow"] = "0 0 20px 0 rgba(0,0,0,0.5)";
  }

  handleMouseLeave(ev) {
    const circle = ev.currentTarget.getElementsByClassName("icon-circle")[0];
    if (circle !== undefined) circle.style["boxShadow"] = "none";
  }

  render() {
    const { classes } = this.props;

    return (
      <Button
        variant="text"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ backgroundColor: "transparent", width: "100%" }}
        disableRipple
      >
        <Grid container className={classes.btnGrid}>
          <Grid item style={{ marginRight: ".5rem" }}>
            <div className={classes.iconCircle + " icon-circle"}>
              <img
                src={"./assets/" + this.props.image}
                alt={this.props.image}
                className={classes.iconImg}
              />
            </div>
          </Grid>
          <Grid item>
            <p className={classes.btnText}>{this.props.name}</p>
          </Grid>
        </Grid>
      </Button>
    );
  }
}

export default withStyles(styles)(HomeButton);
