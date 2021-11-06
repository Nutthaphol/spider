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
import Family from "./components/pages/user/Family";
import Login from "./components/Login";
import InsertForm from "./components/pages/admin/InsertForm";

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
            <Route exact path="/" component={Family} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Family" component={Family} />

            <AdminRoute exact path="/Form" component={InsertForm} />
          </Switch>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Routers;
