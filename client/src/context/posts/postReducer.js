import { GET_ALL, POST_ERROR } from "../types";

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        postfollowers: [...action.payload],
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
