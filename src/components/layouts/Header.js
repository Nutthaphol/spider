import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  makeStyles,
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import Login from "../Login";
import { insertList } from "./listButton/insertList";
import ButtonAppBar from "./menu/ButtonAppBar";
import MenuBar from "./menu/MenuBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#404040",
    },
    "& .MuiToolbar-regular": {
      minHeight: "40px",
    },
    "& .MuiTypography-h4": {
      fontSize: "1.5rem",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div className={classes.appBar}>
      {console.log(`currentUser : ${currentUser}`)}
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            style={{ marginRight: "20px" }}
          >
            Spider Thailand
          </Typography>
          <ButtonAppBar message="Family" link={"/"} />
          {currentUser && (
            <MenuBar
              message="Insert"
              icon={<KeyboardArrowDown />}
              listButton={insertList}
            />
          )}
          <div style={{ flexGrow: 1 }}></div>
          {currentUser ? (
            <Button
              variant="outlined"
              color="inherit"
              align="right"
              size="small"
              onClick={() => {
                window.location.reload();
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              align="right"
              size="small"
              href="login"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
