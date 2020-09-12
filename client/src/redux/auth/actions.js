import decode from 'jwt-decode';
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actionTypes';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (token, user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        '/api/user/login',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        const token = response.data;
        const { user } = await decode(token);
        dispatch(loginSuccess(token, user));
      }
    } catch (error) {
      dispatch(loginFailure(error.response.data));
    }
  };
};
