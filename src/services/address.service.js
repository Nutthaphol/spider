import { httpClient } from "./httpClient";

const postAddress = (data) => {
  const res = httpClient
    .post("address/postAddress", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const updateAddress = (data) => {
  const res = httpClient
    .post("address/updateAddress", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const getAddress = (id) => {
  const res = httpClient.get("address/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAddressAdmin = (id) => {
  const res = httpClient.get("admin/address/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAllAddress = () => {
  const res = httpClient.get("address").then((response) => {
    return response.data;
  });
  return res;
};

const getFromLocationId = (id) => {
  const res = httpClient
    .get("address/getFromLocationId/" + id)
    .then((response) => {
      return response.data;
    });
  return res;
};

export default {
  postAddress,
  getAddress,
  getAllAddress,
  getFromLocationId,
  updateAddress,
  getAddressAdmin,
};
