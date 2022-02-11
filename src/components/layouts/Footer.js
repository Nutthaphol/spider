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
    <Paper sx={{ position: "static", bgcolor: "primary.main", p: 2 }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
              อ้างอิงสำหรับผู้ที่นำไปใช้
            </Typography>
            <Typography variant="body2" sx={{ color: "#000" }}>
              This website should be cited as follows (ผู้ที่นำไปอ้างอิง
              กรุณาเขียนอ้างอิงดังด้านล่าง):
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: "700" }}>
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
  );
};

export default Footer;
