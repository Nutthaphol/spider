import { httpClient } from "./httpClient";

const getAllSpider = async () => {
  const res = await httpClient.get("spiderList");
  console.log(`res ${res}`);
  return res;
};

export default {
  getAllSpider,
};
