import detailService from "../services/detail.service";
import { DETAIL_SUCCESS, DETAIL_FAILED, DETAIL_FETCHING } from "./types";

export const getAllDetail = () => async (dispatch) => {
  try {
    const res = await detailService.getAllDetail();
    if (res) {
      dispatch({
        type: DETAIL_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: DETAIL_FAILED,
    });
  }
};
