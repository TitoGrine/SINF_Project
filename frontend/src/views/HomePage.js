import React from "react";
// base css configurations
import "../index.css";
// material ui core
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
//material icons
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
//components
import BaseButton from "../components/BaseButton.js";

import homePageStyle from "../style/homePageStyle.js";
import { darkred } from "../style/colors.js";

const useStyles = makeStyles(homePageStyle);

function HomePage() {
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
            <h1 className="stylizedText" style={{ margin: 0, color: darkred }}>
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
            <Grid item container justify="center" xs={12} sm={6} md={3}>
              <BaseButton
                type="home"
                name="Supplier Orders"
                image="grape.svg"
              ></BaseButton>
            </Grid>
            <Grid item container justify="center" xs={12} sm={6} md={3}>
              <BaseButton
                type="home"
                name="Client Orders"
                image="wine-barrel.svg"
              ></BaseButton>
            </Grid>
            <Grid item container justify="center" xs={12} sm={6} md={3}>
              <BaseButton
                type="home"
                name="Inventory"
                image="wine-bottle.svg"
              ></BaseButton>
            </Grid>
            <Grid item container justify="center" xs={12} sm={6} md={3}>
              <BaseButton
                type="home"
                name="Warehouse"
                image="architecture.svg"
              ></BaseButton>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              href="/login"
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

export default HomePage;
