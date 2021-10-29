import {
  SPECIES_SUCCESS,
  SPECIES_FETCHING,
  SPECIES_FAILED,
} from "../actions/types";

const initailState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initailState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SPECIES_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case SPECIES_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case SPECIES_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
