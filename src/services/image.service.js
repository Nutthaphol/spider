import { httpClient } from "./httpClient";

const postImage = (data) => {
  console.log("services image", data);
  const res = httpClient.post("image/postImage", data).then((response) => {
    return response.data;
  });
  // console.log("family post res", res);
  return res;
};

const updateImage = (data) => {
  const res = httpClient
    .post("image/updateImage", { data })
    .then((response) => {
      return response.data;
    });
  return res;
};

const getImage = (id) => {
  const res = httpClient.get("image/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getImageAdmin = (id) => {
  const res = httpClient.get("admin/image/" + id).then((response) => {
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
