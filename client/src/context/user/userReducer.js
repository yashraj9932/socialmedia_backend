import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  OTHERUSER_LOADED,
  SEARCHED_USERS
} from '../types'

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      // isko hatane
      localStorage.setItem('user', action.payload)

      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      }
    case OTHERUSER_LOADED:
      return {
        ...state,
        otheruser: action.payload
        // isAuthenticated: true,
        // loading: false,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      // isko hatane
      localStorage.setItem('user', action.payload)
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      // isko hatane
      localStorage.removeItem('user')
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case SEARCHED_USERS:
      return {
        ...state,
        filtered: [...action.payload],
        isAuthenticated: true,
        loading: false
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducer
