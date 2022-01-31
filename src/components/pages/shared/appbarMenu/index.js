import React, { Fragment } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Button, Link, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../actions/auth";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  button: {
    textTransform: "none",
    color: "darkslategray",
    fontWeight: "600",
    fontSize: "16px",
  },
}));

const AppbarMenu = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(false);
  const [open, setOpen] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(false);
    setOpen(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {data &&
          data.map((val, index) => (
            <Fragment key={index}>
              {val.collapse ? (
                <Fragment>
                  <Button
                    disableRipple
                    id="collapse-button"
                    aria-controls={open ? "collapse-menu" : null}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : null}
                    className={classes.button}
                    endIcon={open ? val.endIconClose : val.endIconOpen}
                    onClick={handleClick}
                  >
                    {val.label}
                  </Button>
                  <Menu
                    onClose={handleClose}
                    id="collapse-menu"
                    anchorEl={anchorEl}
                    open={open}
                    MenuListProps={{
                      "aria-labelledby": "collapse-button",
                    }}
                  >
                    {val.collapse.map((collapse, idx) => (
                      <Link
                        underline="none"
                        color="#000"
                        href={collapse.path}
                        key={idx}
                      >
                        <MenuItem href={collapse.path}>
                          {collapse.label}
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Fragment>
              ) : (
                <Button
                  className={classes.button}
                  href={val.path}
                  disableRipple
                >
                  {val.label}
                </Button>
              )}
            </Fragment>
          ))}
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
          <Button disableRipple href="/login" className={classes.button}>
            login
          </Button>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppbarMenu;
