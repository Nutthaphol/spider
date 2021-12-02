import { IMAGE_SUCCESS, IMAGE_FAILED, IMAGE_FETCHING } from "./types";

import imageService from "../services/image.service";

export const getImage = (id) => async (dispatch) => {
  try {
    const res = imageService.getImage(id);
    if (res) {
      dispatch({ type: IMAGE_SUCCESS, payload: res });
    }
  } catch (err) {
    dispatch({ type: IMAGE_FAILED });
  }
};
