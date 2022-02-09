import { httpClient } from "./httpClient";

const getAllFamily = () => {
  const res = httpClient.get("family/allfamily");
  // console.log(`res ${res}`);
  return res;
};

const postFamily = (data) => {
  console.log("services", data);
  const res = httpClient
    .post("family/postfamily", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const getFamily = (id) => {
  const res = httpClient.get("family/" + id).then((response) => {
    return response.data;
  });
  return res;
};
export default {
  getAllFamily,
  getFamily,
  postFamily,
};
