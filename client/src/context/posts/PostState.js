import axios from "axios";
import PostContext from "./postContext";
import postReducer from "./postReducer";

import {
  GET_ALL,
  ADD_POST,
  ADD_LIKE,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../types";

const PostState = (props) => {
  const initialState = {
    postfollowers: null,
    error: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider
      value={{
        postfollowers: state.postfollowers,
        error: state.error,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
