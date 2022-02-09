import { httpClient } from "./httpClient";

const postDetail = (data) => {
  console.log("services", data);
  const res = httpClient
    .post("detail/postDetail", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const updateDetailType = (data) => {
  console.log("services", data);
  const res = httpClient
    .post("detail/updateDatailType", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const updateDetail = (data) => {
  console.log("services", data);
  const res = httpClient
    .post("detail/updateDatail", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const getDetail = (id) => {
  const res = httpClient.get("detail/get/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getDetailAdmin = (id) => {
  const res = httpClient.get("admin/detail/get/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAllDetail = () => {
  const res = httpClient.get("detail").then((response) => {
    return response.data;
  });
  return res;
};

const getAllDetailAdmin = () => {
  const res = httpClient.get("admin/detail").then((response) => {
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
