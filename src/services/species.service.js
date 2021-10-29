import { httpClient } from "./httpClient";

const getAllSpecies = async () => {
  const res = await httpClient.get("/species/allspecies");
  console.log(`res species ${res}`);
  return res;
};

export default {
  getAllSpecies,
};
