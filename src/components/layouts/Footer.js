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
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
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
          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: 600, color: "#000" }}
                >
                  อ้างอิงสำหรับผู้ที่นำไปใช้
                </Typography>
                <Typography variant="body2" sx={{ color: "#000" }}>
                  This website should be cited as follows (ผู้ที่นำไปอ้างอิง
                  กรุณาเขียนอ้างอิงดังด้านล่าง):
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: 600, color: "#000" }}
                >
                  Citation:
                </Typography>
                <Typography variant="body2" sx={{ color: "#000" }}>
                  Spiders in Thailand (2022). Spiders in Thailand. Version 1.0.,
                  online at{" "}
                  <Link sx={{ color: "info.dark", cursor: "pointer" }}>
                    {" "}
                    https://www.spiderthailand.info
                  </Link>
                  , accessed on (date of access).
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Footer;
