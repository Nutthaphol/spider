import { httpClient } from "./httpClient";

const getAllDistrict = () => {
  const res = httpClient.get("getalldistricts").then((response) => {
    return response.data;
  });
  return res;
};

export default { getAllDistrict };
