import {
  LOCATION_SUCCESS,
  LOCATION_FAILED,
  LOCATION_FETCHING,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOCATION_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case LOCATION_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case LOCATION_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
