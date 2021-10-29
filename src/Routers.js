import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, makeStyles } from "@material-ui/core";
import Family from "./components/pages/user/Family";
import Login from "./components/Login";
import FormInsert from "./components/pages/admin/FormInsert";

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
  const { user: currentUser } = useSelector((state) => state.auth);

  const AdminRoute = ({ component: Component, ...rest }) => {
    if (currentUser) {
      {
        console.log(`check auth ${currentUser.roles === "admin"}`);
      }
      return (
        <Route
          {...rest}
          render={(props) =>
            currentUser.roles === "admin" ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <Container className={classes.content} maxWidth={false}>
      <Switch>
        <Route exact path="/" component={Family} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Family" component={Family} />

        <AdminRoute
          exact
          path="/formInsertTypeOfSpider"
          component={FormInsert}
        />
      </Switch>
    </Container>
  );
};

export default Routers;
