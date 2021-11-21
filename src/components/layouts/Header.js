import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { insertList } from "./listButton/insertList";
import ButtonAppBar from "./menu/ButtonAppBar";
import MenuBar from "./menu/MenuBar";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  appBar: {
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#002984",
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
  const [statusMenu, setStatusMenu] = useState(false);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.roles == "admin") {
        setStatusMenu(true);
      } else {
        setStatusMenu(false);
      }
    }
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
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
              <ButtonAppBar message="Home" link={"/"} />
              {statusMenu && (
                <MenuBar
                  message="Insert"
                  icon={<KeyboardArrowDown />}
                  listButton={insertList}
                />
              )}
              <ButtonAppBar message="Check Data" link={"/check"} />
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
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Header;
