import {
  DISTRICT_SUCCESS,
  DISTRICT_FAILED,
  DISTRICT_FETCHING,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DISTRICT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case DISTRICT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case DISTRICT_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
