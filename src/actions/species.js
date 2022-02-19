import { SPECIES_SUCCESS, SPECIES_FAILED, SPECIES_FETCHING } from "./types";

import speciesService from "../services/species.service";

export const getAllSpecies = () => async (dispatch) => {
  try {
    const res = await speciesService.getAllSpecies();
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

export const getDetailSpecies = (id) => async (dispatch) => {
  try {
    const res = await speciesService.getSpecies(id);

    if (res) {
      dispatch({
        type: SPECIES_SUCCESS,
        payload: res,
      });
    }
  } catch (err) {
    dispatch({
      type: SPECIES_FAILED,
    });
  }
};
