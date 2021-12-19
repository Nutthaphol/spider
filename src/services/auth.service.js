import axios from "axios";
import join from "url-join";

// const API_URL = join(process.env.REACT_APP_API_URL, "auth/");
const API_URL = "auth/";

const login = (username, password) => {
  console.log("before", API_URL);
  console.log("after", join(API_URL, "signin"));

  return axios
    .post(join(API_URL, "signin"), {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(`set local storage`);
      }
      console.log(`data ${response.data}`);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { login, logout };
