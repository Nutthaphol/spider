import { GENUS_SUCCESS, GENUS_FAILED, GENUS_FETCHING } from "./types";

import genusService from "../services/genus.service";

export const getAllGenus = () => async (dispatch) => {
  try {
    const res = await genusService.getAllGenus();
    if (res) {
      dispatch({
        type: GENUS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GENUS_FAILED,
    });
  }
};

export const postGenus = (data) => (dispatch) => {
  return genusService.postGenus(data).then((data) => {
    dispatch(getAllGenus());
  });
};
