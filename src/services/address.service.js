import { httpClient } from "./httpClient";

const postAddress = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("address/postaddress", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const getAddress = async (id) => {
  const res = await httpClient.get("address/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getAllAddress = async () => {
  const res = await httpClient.get("address").then((response) => {
    return response.data;
  });
  return res;
};

export default {
  postAddress,
  getAddress,
  getAllAddress,
};
