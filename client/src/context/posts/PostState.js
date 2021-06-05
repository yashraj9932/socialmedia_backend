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
      const res = await axios.get(`/users/${id}/following`);
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
    var config = {
      method: "post",
      url: `/posts`,
      data: formData,
    };
    try {
      const res = await axios(config);
      // const res = await axios.post(`/posts`, formData);
      console.log(res.data);
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: error.data,
      });
    }
  };

  const addLike = async (id) => {
    try {
      await axios.put(`/posts/${id}/like`);
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
      await axios.post(`/posts/${id}/comment`, { text: text }, config);
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
      await axios.delete(`/posts/${postId}/${id}`);
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
