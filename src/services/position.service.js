import { httpClient } from "./httpClient";

const postPosition = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("/position/postposition", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

export default {
  postPosition,
};
