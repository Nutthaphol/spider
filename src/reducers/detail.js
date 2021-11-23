import {
  DETAIL_SUCCESS,
  DETAIL_FAILED,
  DETAIL_FETCHING,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DETAIL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case DETAIL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case DETAIL_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
