import { httpClient } from "./httpClient";

const getAllGenus = async () => {
  const res = await httpClient.get("genus/allgenus");
  // console.log(`res genus ${res}`);
  return res;
};

const postGenus = async (data) => {
  const res = await httpClient
    .post("genus/postgenus", data)
    .then((response) => {
      return response.data;
    });

  return res;
};

const getGenus = async (id) => {
  const res = await httpClient.get("genus/" + id).then((response) => {
    return response.data;
  });
  return res;
};

export default {
  getAllGenus,
  getGenus,
  postGenus,
};
