import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, makeStyles } from "@material-ui/core";
import Family from "./components/pages/user/Family";
import Login from "./components/Login";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
}));

const Routers = () => {
  const classes = useStyles();

  return (
    <Container className={classes.content} maxWidth={false}>
      <Switch>
        <Route exact path="/" component={Family} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Family" component={Family} />
      </Switch>
    </Container>
  );
};

export default Routers;
