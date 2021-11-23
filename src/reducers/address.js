import {
  ADDRESS_SUCCESS,
  ADDRESS_FAILED,
  ADDRESS_FETCHING,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADDRESS_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case ADDRESS_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case ADDRESS_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
