import { httpClient } from "./httpClient";

const getAllGenus = () => {
  const res = httpClient.get("genus/allgenus");
  // console.log(`res genus ${res}`);
  return res;
};

const postGenus = (data) => {
  const res = httpClient.post("genus/postgenus", data).then((response) => {
    return response.data;
  });

  return res;
};

const getGenus = (id) => {
  const res = httpClient.get("genus/" + id).then((response) => {
    return response.data;
  });
  return res;
};

export default {
  getAllGenus,
  getGenus,
  postGenus,
};
