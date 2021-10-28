import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";

const useStyles = makeStyles((theme) => ({}));

const MenuBar = (props) => {
  const { message, icon, listButton } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const prevOpen = React.useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className={classes}>
      <Button
        variant="text"
        color="inherit"
        align="right"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={icon}
      >
        {message}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper style={{ backgroundColor: "#404040", color: "inherit" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {listButton &&
                    listButton.map((item, index) => (
                      <MenuItem key={index} onClick={handleClose}>
                        <Link href={item.path} color="inherit" underline="none">
                          {item.label}
                        </Link>
                      </MenuItem>
                    ))}
                  {/* 
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default MenuBar;
