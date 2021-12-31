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
import { logout } from "../../actions/auth";
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
          backgroundColor: "#8B0000",
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
        {console.log(`currentUser : ${currentUser}`)}
        <AppBar position="sticky" color="default" className={classes.appBar}>
          <Icon sx={{ position: "absolute", top: 0, fontSize: "2.75rem" }}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo/spider-web-logo.svg`}
              width="100%"
            />
          </Icon>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className={classes.logo}
              sx={{ mr: 4 }}
            >
              Spider Thailand
            </Typography>
            <UserMenu />
            {admin && <AdminMenu />}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Header;

{
  /* <Menu /> */
}
{
  /* <ButtonAppBar message="Home" link={"/"} />
              {statusMenu && (
                <MenuBar
                  message="Manage"
                  icon={<KeyboardArrowDown />}
                  listButton={insertList}
              )}
                /> */
}
{
  /* <ButtonAppBar message="Check Data" link={"/check"} /> */
}
{
  /* <div style={{ flexGrow: 1 }}></div> */
}
{
  /* {currentUser ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  align="right"
                  size="small"
                  onClick={() => {
                    window.location.reload();
                    dispatch(logout());
                  }}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
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
                  href={`/login`}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Login
                </Button>
              )} */
}
