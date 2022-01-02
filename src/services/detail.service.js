import { httpClient } from "./httpClient";

const postDetail = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("detail/postDetail", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const updateDetailType = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("detail/updateDatailType", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const updateDetail = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("detail/updateDatail", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const getDetail = async (id) => {
  const res = await httpClient.get("detail/get/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getDetailAdmin = async (id) => {
  const res = await httpClient
    .get("admin/detail/get/" + id)
    .then((response) => {
      return response.data;
    });
  return res;
};

const getAllDetail = async () => {
  const res = await httpClient.get("detail").then((response) => {
    return response.data;
  });
  return res;
};

const getAllDetailAdmin = async () => {
  const res = await httpClient.get("admin/detail").then((response) => {
    return response.data;
  });
  return res;
};

export default {
  postDetail,
  getDetail,
  getAllDetail,
  getAllDetailAdmin,
  updateDetail,
  updateDetailType,
  getDetailAdmin,
};
