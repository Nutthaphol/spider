import {
  FAMILY_SUCCESS,
  FAMILY_FAILED,
  FAMILY_FETCHING,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FAMILY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case FAMILY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case FAMILY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
