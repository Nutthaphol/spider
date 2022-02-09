import { httpClient } from "./httpClient";

const getAllProvinces = () => {
  const res = httpClient.get("getallprovinces").then((response) => {
    return response.data;
  });
  return res;
};

export default { getAllProvinces };
