import { PROVINCE_SUCCESS, PROVINCE_FAILED, PROVINCE_FETCHING } from "./types";
import provinceService from "../services/province.service";

export const getAllProvinces = () => async (dispatch) => {
  try {
    const res = await provinceService.getAllProvinces();
    if (res) {
      dispatch({
        type: PROVINCE_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: PROVINCE_FAILED,
    });
  }
};
