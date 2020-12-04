import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  IconButton,
  InputLabel,
  InputBase,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  label: {
    marginRight: ".8rem",
    color: "#5B0012",
    display: "inline",
  },
  inputWrapper: {
    marginTop: "-6px",
    display: "inline",
  },
  inputRoot: {
    height: 44,
    border: "rgba(91, 0, 18, 0.5) solid 1px",
    borderRadius: theme.shape.borderRadius,
    paddingLeft: "1rem",
    paddingRight: ".5rem",
    verticalAlign: "center",
    "&:hover": {
      border: "rgba(91, 0, 18, 1) solid 1px",
    },
  },
  searchIcon: {
    color: "#5B0012",
  },
}));

function Searchbar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <InputLabel htmlFor="searchbar" className={classes.label}>
        Product ID:
      </InputLabel>
      <div className={classes.inputWrapper}>
        <InputBase
          id="searchbar"
          placeholder="Search…"
          margin="dense"
          classes={{
            root: classes.inputRoot,
          }}
          inputProps={{ "aria-label": "search" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" aria-label="apply search">
                <SearchIcon className={classes.searchIcon} />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </React.Fragment>
  );
}

export default Searchbar;
