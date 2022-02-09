import { httpClient } from "./httpClient";

const getAllSpecies = () => {
  const res = httpClient.get("species/allspecies");
  return res;
};

const postSpecies = (data) => {
  const res = httpClient.post("species/postspecies", data).then((response) => {
    return response.data;
  });
  return res;
};

const getSpecies = (id) => {
  const res = httpClient.get("species/" + id).then((response) => {
    return response.data;
  });
  return res;
};

export default {
  getAllSpecies,
  getSpecies,
  postSpecies,
};
