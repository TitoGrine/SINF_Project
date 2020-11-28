import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import style from "../style/homeButtonStyle.jsx";

const styles = () => ({ ...style });

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
        style={{ backgroundColor: "transparent" }}
        disableRipple
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <div className={classes.iconCircle + " icon-circle"}>
              <img
                src={"./assets/" + this.props.image}
                alt={this.props.image}
                height="80px"
                width="80px"
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
