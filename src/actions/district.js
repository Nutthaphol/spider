import { DISTRICT_SUCCESS, DISTRICT_FAILED, DISTRICT_FETCHING } from "./types";
import districtService from "../services/district.service";

export const getAllDistrict = () => async (dispatch) => {
  try {
    const res = await districtService.getAllDistrict();
    if (res) {
      dispatch({
        type: DISTRICT_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: DISTRICT_FAILED,
    });
  }
};
