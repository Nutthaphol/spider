import axios from "axios";
import join from "url-join";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  console.log(`config url: ${config.url}`);
  // if (!isAbsoluteURLRegex.test(config.url)) {
  config.url = join(process.env.REACT_APP_API_URL, config.url);
  console.log(`req url: ${config.url}`);
  // }

  config.timeout = 900000; // 10 Second

  return config;
});

axios.interceptors.response.use(
  (response) => {
    console.log(`res: ${response}`);
    return response;
  },
  async (error) => {
    console.log(JSON.stringify(error, undefined, 2));

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      alert(JSON.stringify(error));
      return Promise.reject({
        code: "NOT_CONNECT_NETWORK",
        message: "Cannot connect to server, Please try again.",
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
