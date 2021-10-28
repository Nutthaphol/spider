import { httpClient } from "./httpClient";

const getAllGenus = async () => {
  const res = await httpClient.get("/genus/allgenus");
  // console.log(`res genus ${res}`);
  return res;
};

export default {
  getAllGenus,
};
