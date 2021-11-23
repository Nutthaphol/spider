import { ADDRESS_SUCCESS, ADDRESS_FAILED, ADDRESS_FETCHING } from "./types";
import addressService from "../services/address.service";

export const getAllAddress = () => async (dispatch) => {
  try {
    const res = await addressService.getAllAddress();
    if (res) {
      dispatch({
        type: ADDRESS_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: ADDRESS_FAILED,
    });
  }
};
