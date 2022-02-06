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
import AppbarMenu from "../pages/shared/appbarMenu";
import MobileMenu from "../pages/shared/MobileMenu";
import themplates from "../pages/shared/theme";

const theme = createTheme(themplates);

const useStyles = makeStyles((theme) => ({
  appBar: {
    "&.MuiPaper-root.MuiAppBar-root": {
      boxShadow: "0 1 8px rgba(11,11,11,0.30)",
    },
    position: "sticky",
    position: "-webkit-sticky",
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
  const [isMobile, setIsMobile] = useState(false);
  const [listMenu, setListMenu] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.roles == "admin") {
      const listMenu_ = UserMenu.concat(AdminMenu);
      setListMenu(listMenu_);
    } else {
      setListMenu(UserMenu);
    }

    setIsMobile(window.innerWidth <= 600);
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppBar
          position="sticky"
          color="default"
          className={classes.appBar}
          sx={{ bgcolor: "primary.main" }}
        >
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
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: isMobile ? "row-reverse" : "row",
              }}
            >
              <Box sx={{ flexGrow: 1, flexBasis: 1 }} />
              {!isMobile ? (
                <Box>
                  <AppbarMenu data={listMenu} />
                </Box>
              ) : (
                <Box>
                  <MobileMenu data={listMenu} />
                </Box>
              )}
              {/* {admin && <AdminMenu />}
                <UserMenu />
                {currentUser ? (
                  <Button
                    disableRipple
                    className={classes.button}
                    onClick={() => {
                      window.location.reload();
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
                )} */}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Header;
