import { httpClient } from "./httpClient";

const postPaper = async (data) => {
  console.log("services paper", data);
  const res = await httpClient
    .post("paper/postPaper", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const updatePaper = async (data) => {
  console.log("services paper", data);
  const res = await httpClient
    .post("paper/updatePaper", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

const getPaper = async (id) => {
  const res = await httpClient.get("paper/" + id).then((response) => {
    return response.data;
  });
  return res;
};

const getPaperAdmin = async (id) => {
  const res = await httpClient.get("admin/paper/" + id).then((response) => {
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
