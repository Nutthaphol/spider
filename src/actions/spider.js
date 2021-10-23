import {
  SPIDERLIST_SUCCESS,
  SPIDERLIST_FAILED,
  SPIDERLIST_FETCHING,
} from "./types";

import spiderService from "../services/spider.service";

export const getAllSpider = () => async (dispatch) => {
  try {
    const res = await spiderService.getAllSpider();
    console.log("res = ", res);
    if (res) {
      dispatch({
        type: SPIDERLIST_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SPIDERLIST_FAILED,
    });
    console.log(`get all spider error: ${err}`);
  }
};
