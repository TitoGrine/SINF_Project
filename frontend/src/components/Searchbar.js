import React from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

import searchbarStyle from "../style/searchbarStyle";

const useStyles = makeStyles(searchbarStyle);

function Searchbar({ onChange }) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <InputLabel htmlFor="searchbar" className={classes.label}>
          Product ID:
        </InputLabel>
      </Grid>
      <Grid item>
        <InputBase
          id="searchbar"
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
          }}
          inputProps={{ "aria-label": "search" }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          }
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
}

export default Searchbar;
