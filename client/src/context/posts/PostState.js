import { useReducer } from "react";
import axios from "axios";
import PostContext from "./postContext";
import postReducer from "./postReducer";

import {
  GET_ALL,
  ADD_POST,
  ADD_LIKE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  POST_ERROR,
} from "../types";

const PostState = (props) => {
  const initialState = {
    postfollowers: [],
    error: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  const getallposts = async (id) => {
    try {
      const res = await axios.get(`/users/${id}/following`);
      dispatch({
        type: GET_ALL,
        payload: res.data.data,
      });
    } catch (error) {
      console.log("Code fatt gaya bro");
      dispatch({
        type: POST_ERROR,
        payload: error.data,
      });
    }
  };

  return (
    <PostContext.Provider
      value={{
        postfollowers: state.postfollowers,
        error: state.error,
        getallposts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
