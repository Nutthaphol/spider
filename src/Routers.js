import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import InsertForm from "./components/pages/admin/InsertForm";
import Detail from "./components/pages/user/Detail";
import Manage from "./components/pages/admin/Manage";
import EditDetailForm from "./components/pages/admin/EditDetailForm";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  content: {
    // flexGrow: 1,
    display: "flex",
    justifyContent: "center",
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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Container className={classes.content} maxWidth={false} disableGutters>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/detail/:id" component={Detail} />

            <AdminRoute exact path="/Form" component={InsertForm} />
            <AdminRoute exact path="/Manage" component={Manage} />
            <AdminRoute
              exact
              path="/editDetailForm/:id"
              component={EditDetailForm}
            />
          </Switch>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Routers;
