import { httpClient } from "./httpClient";

const postAddress = async (data) => {
  console.log("services", data);
  const res = await httpClient
    .post("/address/postaddress", { data })
    .then((response) => {
      return response.data;
    });
  // console.log("family post res", res);
  return res;
};

export default {
  postAddress,
};
