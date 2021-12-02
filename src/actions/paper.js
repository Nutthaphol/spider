import paperService from "../services/paper.service";
import { PAPER_SUCCESS, PAPER_FAILED, PAPER_FETCHING } from "./types";

export const getPaper = (id) => async (dispatch) => {
  try {
    const res = paperService.getPaper(id);
    if (res) {
      dispatch({ type: PAPER_SUCCESS, payload: res });
    }
  } catch (err) {
    dispatch({ type: PAPER_FAILED });
  }
};
