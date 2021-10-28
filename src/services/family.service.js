import { httpClient } from "./httpClient";

const getAllFamily = async () => {
  const res = await httpClient.get("/family/allfamily");
  // console.log(`res ${res}`);
  return res;
};

export default {
  getAllFamily,
};
