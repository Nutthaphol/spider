import axios from "axios";
import join from "url-join";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
const user = JSON.parse(localStorage.getItem("user"));

axios.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(process.env.REACT_APP_API_URL, config.url);
  }

  if (user && user.accessToken) {
    config.headers = { "x-access-token": user.accessToken };
  }
  config.maxContentLength = 800000;
  config.maxBodyLength = 1256000;
  config.timeout = 15000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log(JSON.stringify(error, undefined, 2));
    // if (error.response.status === "401") {
    //   const refreshToken = localStorage.getItem(server.REFRESH_TOKEN_KEY);
    //   let result = await axios.post(
    //     "http://localhost:8081/api/v2/refresh/token",
    //     {
    //       refreshToken: refreshToken
    //     }
    //   );

    //   const token = result.data.jwt;
    //   localStorage.setItem(server.TOKEN_KEY, token);
    //   debugger;
    //   return axios.request(error.config);
    // }

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      // alert(JSON.stringify(error));
      return Promise.reject({
        code: "NOT_CONNECT_NETWORK",
        message: "Cannot connect to server, Please try again.",
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
