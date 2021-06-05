import { GET_ALL, ADD_POST, POST_ERROR } from "../types";

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL:
      // console.log(action.payload);
      return {
        ...state,
        postfollowers: [...action.payload],
      };
    case POST_ERROR:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
