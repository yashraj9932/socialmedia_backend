import React, { useReducer } from "react";
import axios from "axios";
import { url } from "../../config";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  OTHERUSER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SEARCHED_USERS,
  // CLEAR_ERRORS,
} from "../types";

const UserState = (props) => {
  const initialState = {
    isAuthenticated: null,
    // user: null,
    user: localStorage.getItem("user"),
    otheruser: null,
    errors: null,
    token: localStorage.getItem("token"),
    loading: true,
    filtered: [],
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(url + "/users/user/current");
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const urluser = async (id) => {
    try {
      const res = await axios.get(url + `/users/${id}`);
      dispatch({
        type: OTHERUSER_LOADED,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async (body) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(url + "/users/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  const login = async (body) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(url + "/users/login", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const addBio = async (bio) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(url + `users/update/bio`, { bio }, config);
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  const followUser = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(url + `/users/${id}/follow`, {}, config);
    } catch (err) {}
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(url + "/users");
      dispatch({
        type: SEARCHED_USERS,
        payload: res.data.data,
      });
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        otheruser: state.otheruser,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        filtered: state.filtered,
        register,
        login,
        loadUser,
        logout,
        urluser,
        addBio,
        followUser,
        getAllUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
