import { IMAGE_SUCCESS, IMAGE_FAILED, IMAGE_FETCHING } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case IMAGE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case IMAGE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case IMAGE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
