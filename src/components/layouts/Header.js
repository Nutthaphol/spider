import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Icon,
} from "@mui/material";
import {
  ArrowDownward,
  ArrowDropDown,
  KeyboardArrowDown,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../actions/auth";
import UserMenu from "./user";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import AdminMenu from "./admin";
const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          // backgroundColor: "#8B0000",
          backgroundColor: "#F4CB49",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minWidth: "48px",
          "@media (min-width:0px) and (orientation: landscape)": {
            minHeight: 48,
          },
          "@media (min-width:600px)": { minHeight: 48 },
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    "&.MuiPaper-root.MuiAppBar-root": {
      boxShadow: "0 1 8px rgba(11,11,11,0.30)",
    },
  },
  logo: {
    fontFamily: "SeoulHangang CEB",
    fontSize: "32px",
    fontWeight: "600",
    color: "#fff",
  },
  button: {
    textTransform: "none",
    color: "darkslategray",
    fontWeight: "600",
    fontSize: "16px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.roles == "admin") {
      setAdmin(true);
    }
  }, [admin]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color="default" className={classes.appBar}>
          {/* <Icon
            sx={{
              position: "absolute",
              top: 0,
              fontSize: "2.75rem",
              position: "absolute",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo/spider-web-logo.svg`}
              width="100%"
            />
          </Icon> */}
          <Toolbar>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ flexGrow: 1, flexBasis: 1 }} />
              <Box>
                {admin && <AdminMenu />}
                <UserMenu />
                {currentUser ? (
                  <Button
                    disableRipple
                    className={classes.button}
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Log out
                  </Button>
                ) : (
                  <Button
                    disableRipple
                    href="/login"
                    className={classes.button}
                  >
                    login
                  </Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Header;
