import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import {
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { logout } from "../../../../actions/auth";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import { Box } from "@mui/material/node_modules/@mui/system";
import { NavLink } from "react-router-dom";
const theme = createTheme();

const useStyles = makeStyles(() => ({
  iconMenu: {},
}));

const MobileMenu = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openCollapse, setOpenCollapse] = React.useState(-1);

  const [anchorEl, setAnchorEl] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(!openMenu);
  };

  const handleClose = () => {
    setAnchorEl(false);
    setOpenMenu(false);
  };

  const handleClickCollapse = (index) => {
    if (openCollapse === index) {
      setOpenCollapse(-1);
    } else {
      setOpenCollapse(index);
    }
  };

  //   const handleOnClickSelect = (value) => {
  //     dispatch({ type: "CLICK", path: value });
  //   };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <IconButton
          disableRipple
          className={classes.iconMenu}
          onClick={handleClick}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer open={openMenu} anchor="left" onClose={handleClose}>
          <Box sx={{ width: 240 }}>
            <List>
              {data &&
                data.map((value, index) => (
                  <Fragment key={index}>
                    {value.collapse ? (
                      <Fragment>
                        <ListItem
                          onClick={() => handleClickCollapse(index)}
                          key={value.listKey}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {value.label}
                              </Typography>
                            }
                          />
                          {openCollapse === index ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItem>
                        <Collapse
                          in={openCollapse === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List>
                            {value.collapse.map((collapse) => {
                              return (
                                <ListItem
                                  component={NavLink}
                                  to={collapse.path}
                                  button
                                  key={collapse.listKey}
                                  onClick={() => handleClose()}
                                >
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="subtitle1"
                                        component="span"
                                        sx={{
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {collapse.label}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      </Fragment>
                    ) : (
                      <ListItem
                        component={NavLink}
                        to={value.path}
                        button
                        key={value.listKey}
                        onClick={() => handleClose()}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle1"
                              component="span"
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {value.label}
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                  </Fragment>
                ))}
              <Divider />
              {currentUser ? (
                <ListItem
                  button
                  onClick={() => {
                    window.location.reload();
                    dispatch(logout());
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Logout
                      </Typography>
                    }
                  />
                </ListItem>
              ) : (
                <ListItem
                  component={NavLink}
                  to={`/login`}
                  button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Login
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MobileMenu;
