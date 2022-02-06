import React from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
} from "@mui/material";
import themplates from "./theme";

const theme = createTheme(themplates);
const useStyles = makeStyles(() => ({}));

const PaperPopup = (props) => {
  const classes = useStyles();
  const { positionName, province, family, genus, species } = props;
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemText
              primary={
                <Typography variant="body1" component="span">
                  {<b>Position name: </b>}
                  {positionName}
                </Typography>
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary={
                <Typography variant="body1" component="span">
                  {<b>Province:</b>} {province}
                </Typography>
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary={
                <Typography variant="body1" component="span">
                  {<b>Family:</b>} {family}
                </Typography>
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary={
                <Typography variant="body1" component="span">
                  {<b>Genus:</b>} {<i>{genus}</i>}
                </Typography>
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary={
                <Typography variant="body1" component="span">
                  {<b>Species:</b>}{" "}
                  {
                    <i>
                      {genus} {species}
                    </i>
                  }
                </Typography>
              }
            />
          </ListItem>
        </List>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PaperPopup;
