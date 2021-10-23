import {
  SPIDERLIST_SUCCESS,
  SPIDERLIST_FAILED,
  SPIDERLIST_FETCHING,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SPIDERLIST_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case SPIDERLIST_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case SPIDERLIST_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
