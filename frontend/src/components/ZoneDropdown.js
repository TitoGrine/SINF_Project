import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import zoneDropdownStyle from "../style/zoneDropdownStyle";

const MyInput = withStyles((theme) => ({
  root: {
    height: 44,
    border: "rgba(91, 0, 18, 0.5) solid 1px",
    borderRadius: theme.shape.borderRadius,
    transition: "border-color .25s ease-in-out, box-shadow .25s ease-in-out",
    "&:hover": {
      border: "#5B0012 solid 1px",
      boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
    },
  },
  input: {
    position: "relative",
    backgroundColor: "transparent",
    padding: "10px 26px 10px 12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
}))(InputBase);

const useStyles = makeStyles(zoneDropdownStyle);

function ZoneDropdown() {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <InputLabel htmlFor="zoneDropdown" className={classes.label}>
          Zone:
        </InputLabel>
      </Grid>
      <Grid item>
        <Select
          id="zoneDropdown"
          displayEmpty
          defaultValue=""
          className={classes.select}
          margin="dense"
          input={<MyInput />}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="A1">A1</MenuItem>
          <MenuItem value="A2">A2</MenuItem>
          <MenuItem value="A3">A3</MenuItem>
          <MenuItem value="A4">A4</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
}

export default ZoneDropdown;
