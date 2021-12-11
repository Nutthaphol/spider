import { httpClient } from "./httpClient";

const postImage = async (data) => {
  console.log("services image", data);
  const res = await httpClient
    .post("image/postImage", data)
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const updateImage = async (data) => {
  const res = await httpClient
    .post("image/updateImage", { data })
    .then((response) => {
      return response.data;
    });
};

const getImage = async (id) => {
  const res = await httpClient.get("image/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getImageAdmin = async (id) => {
  const res = await httpClient.get("admin/image/" + id).then((response) => {
    return response.data;
  });
  return res;
};

export default {
  postImage,
  getImage,
  getImageAdmin,
  updateImage,
};
