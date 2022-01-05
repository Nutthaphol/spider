import React, { Fragment } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material/node_modules/@mui/system";
import { logout } from "../../actions/auth";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    height: "100px",
    backgroundColor: "#8B0000",
    borderRadius: "0",
    padding: "20px 0 20px 0",
    color: "#fff",
  },
  button: {
    textTransform: "none",
    color: "#fff",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#8B0000",
      textDecoration: "underline",
    },
    "& .MuiTouchRipple-root span": {
      backgroundColor: "transparent!important",
    },
  },
  subheader: {
    backgroundColor: "#8B0000",
    color: "#fff",
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Paper className={classes.footer} sx={{ position: "static" }}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Box sx={{ flexGrow: 1, flexBasis: 1 }}>
                {/* <Typography variant="subtitle2">Account</Typography> */}
                <List
                  component="nav"
                  disablePadding
                  //   subheader={
                  //     <ListSubheader className={classes.subheader} disableGutters>
                  //       Account
                  //     </ListSubheader>
                  //   }
                >
                  {currentUser ? (
                    <ListItem disableGutters>
                      <ListItemText
                        primary={
                          <Fragment>
                            <Button
                              href="/login"
                              className={classes.button}
                              onClick={() => {
                                dispatch(logout());
                              }}
                            >
                              logout
                            </Button>
                          </Fragment>
                        }
                      />
                    </ListItem>
                  ) : (
                    <ListItem disableGutters>
                      <ListItemText
                        primary={
                          <Fragment>
                            <Button href="/login" className={classes.button}>
                              login
                            </Button>
                          </Fragment>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
              <Box sx={{ flexGrow: 1, flexBasis: 1 }}></Box>
              <Box sx={{ flexGrow: 1, flexBasis: 1 }}></Box>
              <Box sx={{ flexGrow: 1, flexBasis: 1 }}></Box>
            </Box>
          </Container>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Footer;
