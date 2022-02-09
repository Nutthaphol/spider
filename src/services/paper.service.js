import { httpClient } from "./httpClient";

const postPaper = (data) => {
  console.log("services paper", data);
  const res = httpClient.post("paper/postPaper", { data }).then((response) => {
    return response.data;
  });
  // console.log("family post res", res);
  return res;
};

const updatePaper = (data) => {
  console.log("services paper", data);
  const res = httpClient
    .post("paper/updatePaper", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const getPaper = (id) => {
  const res = httpClient.get("paper/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getPaperAdmin = (id) => {
  const res = httpClient.get("admin/paper/" + id).then((response) => {
    return response.data;
  });
  return res;
};

export default {
  postPaper,
  getPaper,
  updatePaper,
  getPaperAdmin,
};
