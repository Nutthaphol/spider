import { httpClient } from "./httpClient";

const getAllDistrict = async () => {
  const res = await httpClient.get("/getalldistricts").then((response) => {
    return response.data;
  });
  return res;
};

export default { getAllDistrict };
