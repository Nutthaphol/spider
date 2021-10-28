import { Button } from "@material-ui/core";
import React from "react";

const ButtonAppBar = (props) => {
  const { message, link, icon } = props;
  return (
    <Button
      variant="text"
      color="inherit"
      align="right"
      href={link}
      endIcon={icon}
    >
      {message}
    </Button>
  );
};

export default ButtonAppBar;
