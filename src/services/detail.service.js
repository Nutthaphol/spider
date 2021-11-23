import { httpClient } from "./httpClient";

const postDetail = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("detail/postdetail", { data })
    .then((response) => {
      return response.data;
    });
  //   console.log("detail post res", res);
  return res;
};

const getDetail = async (id) => {
  const res = await httpClient.get("detail/get/" + id).then((response) => {
    return response.data;
  });
  console.log("get detail", res);
  return res;
};

const getAllDetail = async () => {
  const res = await httpClient.get("detail").then((response) => {
    return response.data;
  });
  return res;
};

export default {
  postDetail,
  getDetail,
  getAllDetail,
};
