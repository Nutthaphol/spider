import { Button } from "@mui/material";
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
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRight: "1px solid #fff",
        borderRadius: "0",
      }}
    >
      {message}
    </Button>
  );
};

export default ButtonAppBar;
