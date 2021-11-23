import { httpClient } from "./httpClient";

const getAllFamily = async () => {
  const res = await httpClient.get("family/allfamily");
  // console.log(`res ${res}`);
  return res;
};

const postFamily = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("family/postfamily", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const getFamily = async (id) => {
  const res = await httpClient.get("family/" + id).then((response) => {
    return response.data;
  });
  return res;
};
export default {
  getAllFamily,
  getFamily,
  postFamily,
};
