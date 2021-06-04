import {
  GET_ALL,
  ADD_POST,
  ADD_LIKE,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../types";

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL:
      let postss = [];
      console.log(action.payload);
      action.payload.map((user) => postss.push(user.posts));
      return {
        ...state,
        postfollowers: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
