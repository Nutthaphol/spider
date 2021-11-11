import { httpClient } from "./httpClient";

const getAllSpecies = async () => {
  const res = await httpClient.get("/species/allspecies");
  console.log(`res species ${res}`);
  return res;
};

const postSpecies = async (data) => {
  const res = await httpClient
    .post("/species/postspecies", data)
    .then((response) => {
      return response.data;
    });
  return res;
};

export default {
  getAllSpecies,
  postSpecies,
};