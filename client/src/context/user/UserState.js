import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  // CLEAR_ERRORS,
} from "../types";

const UserState = (props) => {
  const initialState = {
    isAuthenticated: null,
    user: null,
    errors: null,
    token: localStorage.getItem("token"),
    loading: true,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/users/user/current");
      dispatch({
        type: USER_LOADED,
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
      const res = await axios.post("/users/register", body, config);
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
      const res = await axios.post("/users/login", body, config);
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

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        register,
        login,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
