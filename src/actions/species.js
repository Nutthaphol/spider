import { SPECIES_SUCCESS, SPECIES_FAILED, SPECIES_FETCHING } from "./types";

import speciesService from "../services/species.service";

export const getAllSpecies = () => async (dispatch) => {
  try {
    const res = await speciesService.getAllSpecies();
    // console.log("res = ", res);
    if (res) {
      dispatch({
        type: SPECIES_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: SPECIES_FAILED,
    });
  }
};
