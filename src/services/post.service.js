import { httpClient } from "./httpClient";

const postFullData = (data) => {
  console.log(`services ${JSON.stringify(data)}`);
  return httpClient.post("/post/postfulldata", data).then((res) => {
    return res.data;
  });
};

export default {
  postFullData,
};
