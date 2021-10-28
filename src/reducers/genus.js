import { GENUS_SUCCESS, GENUS_FAILED, GENUS_FETCHING } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GENUS_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case GENUS_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case GENUS_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
