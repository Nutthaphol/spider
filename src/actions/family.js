import { FAMILY_SUCCESS, FAMILY_FAILED, FAMILY_FETCHING } from "./types";

import familyService from "../services/family.service";

export const getAllFamily = () => async (dispatch) => {
  try {
    const res = await familyService.getAllFamily();
    // console.log("res = ", res);
    if (res) {
      dispatch({
        type: FAMILY_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FAMILY_FAILED,
    });
  }
};
