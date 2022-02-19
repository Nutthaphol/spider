import { httpClient } from "./httpClient";

const postLocation = (data) => {
  const res = httpClient
    .post("/location/postLocation", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const updateLocation = (data) => {
  const res = httpClient
    .post("/location/updateLocation", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const getLocation = (id) => {
  const res = httpClient.get("location/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getLocationAdmin = (id) => {
  const res = httpClient.get("admin/location/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAllLocation = () => {
  const res = httpClient.get("location").then((response) => {
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
