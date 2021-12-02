import { LOCATION_SUCCESS, LOCATION_FAILED, LOCATION_FETCHING } from "./types";
import locationService from "../services/location.service";

export const getAllLocation = () => async (dispatch) => {
  try {
    const res = await locationService.getAllLocation();
    if (res) {
      dispatch({
        type: LOCATION_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: LOCATION_FAILED,
    });
  }
};

export const getLocation = (id) => async (dispatch) => {
  try {
    const res = locationService.getLocation(id);
    if (res) {
      dispatch({
        type: LOCATION_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({ type: LOCATION_FAILED });
  }
};
