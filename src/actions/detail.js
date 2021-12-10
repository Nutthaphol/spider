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

export const getAllDetailAdmin = () => async (dispatch) => {
  try {
    const res = await detailService.getAllDetailAdmin();
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

export const getDetail = (id) => async (dispatch) => {
  try {
    const res = await detailService.getDetail(id);
    console.log("action detail res", res);
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
export const getDetailAdmin = (id) => async (dispatch) => {
  try {
    const res = await detailService.getDetailAdmin(id);
    console.log("action detail res", res);
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
