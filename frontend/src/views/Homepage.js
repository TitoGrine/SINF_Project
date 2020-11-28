import React from "react";
// base css configurations
import "../index.css";
// material ui core
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import HomeButton from "../components/HomeButton.jsx";

import { makeStyles } from "@material-ui/core/styles";
import style from "../style/homepageStyle.js";

const styles = { ...style };
const useStyles = makeStyles(styles);

//TODO: customize error page
function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          className={classes.card}
        >
          <Grid item>
            <h1 className="stylizedText" style={{ margin: 0 }}>
              Vicino
            </h1>
          </Grid>
          <Grid
            item
            container
            justify="space-around"
            alignItems="center"
            style={{ width: "80%" }}
          >
            <Grid item container justify="center" xs={3}>
              <HomeButton name="Supplier Orders" image="grape.svg"></HomeButton>
            </Grid>
            <Grid item container justify="center" xs={3}>
              <HomeButton
                name="Client Orders"
                image="wine-barrel.svg"
              ></HomeButton>
            </Grid>
            <Grid item container justify="center" xs={3}>
              <HomeButton name="Inventory" image="wine-bottle.svg"></HomeButton>
            </Grid>
            <Grid item container justify="center" xs={3}>
              <HomeButton
                name="Warehouse"
                image="architecture.svg"
              ></HomeButton>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              href="#"
              size="large"
              variant="text"
              startIcon={<SubdirectoryArrowRightIcon />}
              className={classes.logoutBtn}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Homepage;
