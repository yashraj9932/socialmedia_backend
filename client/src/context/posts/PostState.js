import { useReducer } from "react";
import axios from "axios";
import PostContext from "./postContext";
import postReducer from "./postReducer";

import { GET_ALL, POST_ERROR } from "../types";

const PostState = (props) => {
  const initialState = {
    postfollowers: [],
    error: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  const getallposts = async (id) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SITE + `/users/${id}/following`
      );
      dispatch({
        type: GET_ALL,
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error.data, "err");
      dispatch({
        type: POST_ERROR,
        payload: error.data,
      });
    }
  };

  const createPost = async (formData) => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_SITE}/posts`,
      data: formData,
    };
    try {
      await axios(config);
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.data,
      });
    }
  };

  const addLike = async (id) => {
    try {
      await axios.put(process.env.REACT_APP_SITE + `/posts/${id}/like`);
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.data,
      });
    }
  };

  const addComment = async (text, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        process.env.REACT_APP_SITE + `/posts/${id}/comment`,
        { text },
        config
      );
      getallposts();
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.data,
      });
    }
  };

  const deleteComment = async (postId, id) => {
    try {
      await axios.delete(process.env.REACT_APP_SITE + `/posts/${postId}/${id}`);
      getallposts();
    } catch (error) {
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
        deleteComment,
        addLike,
        addComment,
        createPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
