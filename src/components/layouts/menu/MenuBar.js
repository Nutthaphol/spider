import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Link,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: 6,
      // marginTop: theme.spacing(1),
      minWidth: 140,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "2px 0",
      },
    },
  },
}));

const MenuBar = (props) => {
  const { message, icon, listButton } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ color: "white" }}
        >
          Insert
        </Button>
        <Menu
          className={classes.root}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          elevation={0}
          // anchorOrigin={{
          //   vertical: "bottom",
          //   horizontal: "right",
          // }}
          // transformOrigin={{
          //   vertical: "top",
          //   horizontal: "right",
          // }}
        >
          {listButton &&
            listButton.map((val, index) => (
              <Link
                key={index}
                href={val.path}
                underline="none"
                sx={{ color: "black" }}
              >
                <MenuItem>{val.label}</MenuItem>
              </Link>
            ))}
        </Menu>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MenuBar;
