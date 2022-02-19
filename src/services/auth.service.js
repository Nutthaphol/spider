// import axios from "axios";
import join from "url-join";
import { httpClient } from "./httpClient";

// const API_URL = join(process.env.REACT_APP_API_URL, "auth/");
// const API_URL = "auth/";

const login = (username, password) => {
  return httpClient
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { login, logout };
