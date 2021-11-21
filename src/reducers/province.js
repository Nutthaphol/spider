import {
  PROVINCE_SUCCESS,
  PROVINCE_FAILED,
  PROVINCE_FETCHING,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROVINCE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case PROVINCE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case PROVINCE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
