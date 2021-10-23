import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flxed",
  //   },
  //   appBar: {
  //     zIndex: theme.zIndex.drawer + 1,
  //     transition: theme.transitions.create(["width", "margin"], {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //   },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" component="div">
            Spider Thailand
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Button variant="outlined" color="inherit" align="right">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
