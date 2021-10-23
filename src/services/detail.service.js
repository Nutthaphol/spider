import { httpClient } from "./httpClient";

const getAllDetail = async () => {
  const res = await httpClient.get("details");
  console.log(`res ${res}`);
  return res;
};

export default {
  getAllDetail,
};
