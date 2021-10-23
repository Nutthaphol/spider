import { DETAIL_SUCCESS, DETAIL_FAILED, DETAIL_FETCHING } from "./types";

import detailService from "../services/detail.service";

export const getAllDetail = () => async (dispatch) => {
  try {
    const res = await detailService.getAllDetail();
    console.log("res = ", res);
    if (res) {
      dispatch({
        type: DETAIL_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: DETAIL_FAILED,
    });
    console.log(`get all detail error: ${err}`);
  }
};
