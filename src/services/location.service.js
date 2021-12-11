import { httpClient } from "./httpClient";

const postLocation = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("/location/postLocation", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const updateLocation = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("/location/updateLocation", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const getLocation = async (id) => {
  const res = await httpClient.get("location/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getLocationAdmin = async (id) => {
  const res = await httpClient.get("admin/location/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAllLocation = async () => {
  const res = await httpClient.get("location").then((response) => {
    return response.data;
  });
  return res;
};

export default {
  postLocation,
  getLocation,
  getAllLocation,
  updateLocation,
  getLocationAdmin,
};
