import { httpClient } from "./httpClient";

const postDetail = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("/detail/postdetail", { data })
    .then((response) => {
      return response.data;
    });
  //   console.log("detail post res", res);
  return res;
};

export default {
  postDetail,
};
