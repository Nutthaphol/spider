import { CardHeader } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { red, green } from "@mui/material/colors";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../actions/auth";

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  rootCard: {
    width: 345,
    marginTop: 100,
  },
  showPassword: {
    position: "absolute",
    justifyContent: "center",
  },
  submit: {
    backgroundColor: "#0090CB",
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const PasswordField = ({ isSubmitting, values, handleChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl
      variant="outlined"
      style={{ width: "100%", marginTop: 8 }}
      error={error}
      fullWidth
      margin="normal"
      size="small"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        disabled={isSubmitting}
        label="Password"
        name="password"
        id="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const LoginButton = withStyles(() => ({
  root: {
    marginTop: 10,
    color: theme.palette.getContrastText("#ED7044"),
    backgroundColor: "#ED7044",
    "&:hover": {
      backgroundColor: "#EE9236",
    },
  },
}))(Button);

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [serverMessage, setServerMessage] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      props.history.push("/");
    }
  }, []);

  const handleMessage = (value) => {
    const message = value;
    setServerMessage(message);
  };

  const showForm = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    handleClickShowPassword,
    handleMouseDownPassword,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          fullWidth
          id="username"
          name="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoFocus
          error={errors.username}
          disabled={isSubmitting}
        ></TextField>

        {errors.username && (
          <Typography style={{ color: "#C82626" }}>
            {errors.username}
          </Typography>
        )}
        <PasswordField
          isSubmitting={isSubmitting}
          values={values}
          handleChange={handleChange}
          name="password"
          error={errors.password}
        ></PasswordField>
        {errors.password && (
          <Typography style={{ color: "#C82626" }}>
            {errors.password}
          </Typography>
        )}
        <LoginButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          className={classes.submit}
        >
          {" Sign In"}
          {/* {isSubmitting ? "Please wait..." : "Sign In"} */}
        </LoginButton>
      </form>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div style={{ height: "100vh" }}>
          <div className={classes.root}>
            <Card className={classes.rootCard}>
              {/* Insert Title */}
              <CardHeader style={{ textAlign: "center" }} title="Login" />
              <CardContent>
                {serverMessage && (
                  <Typography
                    sx={{ fontSize: 14 }}
                    style={{ color: "#C82626" }}
                    gutterBottom
                  >
                    {serverMessage}
                  </Typography>
                )}
                <Formik
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    dispatch(login(values.username, values.password))
                      .then(() => {
                        handleMessage(false);
                        props.history.push("/");
                        window.location.reload();

                        // else {
                        //   // props.history.push("/login");
                        //   // window.location.reload();
                        //   resetForm();
                        //   handleMessage(data);
                        // }
                      })
                      .catch((error) => {
                        resetForm();
                        handleMessage(error);
                      });
                  }}
                  initialValues={{
                    username: "",
                    password: "",
                    showPassword: false,
                  }}
                  validate={validate}
                >
                  {(props) => showForm(props)}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Login;
