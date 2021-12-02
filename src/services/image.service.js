import { httpClient } from "./httpClient";

const postImage = async (data) => {
  console.log("services image", data);
  const res = await httpClient
    .post("image/postimage", data)
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const getImage = async (id) => {
  const res = await httpClient
    .get("image/getfromdetail/" + id)
    .then((response) => {
      return response.data;
    });
  return res;
};

export default {
  postImage,
  getImage,
};
