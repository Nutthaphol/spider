import { httpClient } from "./httpClient";

const postLocation = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("/location/postlocation", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

export default {
  postLocation,
};
