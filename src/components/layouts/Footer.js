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
    backgroundColor: "#F4CB49",
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
          <Container maxWidth="xl"></Container>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Footer;
