import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";

import authService from "../services/auth.service";

export const login = async (username, password) => (dispatch) => {
  return authService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      return Promise.reject(message);
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const runLogoutTimer = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const timer = user.expiresIn * 1000;
    setTimeout(() => {
      dispatch(logout());
    }, timer);
  }
};
