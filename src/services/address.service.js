import { httpClient } from "./httpClient";

const postAddress = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("address/postAddress", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const updateAddress = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("address/updateAddress", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const getAddress = async (id) => {
  const res = await httpClient.get("address/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAddressAdmin = async (id) => {
  const res = await httpClient.get("admin/address/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAllAddress = async () => {
  const res = await httpClient.get("address").then((response) => {
    return response.data;
  });
  return res;
};

const getFromLocationId = async (id) => {
  const res = await httpClient
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
