import { httpClient } from "./httpClient";

const getAllProvinces = async () => {
  const res = await httpClient.get("getallprovinces").then((response) => {
    return response.data;
  });
  return res;
};

export default { getAllProvinces };
