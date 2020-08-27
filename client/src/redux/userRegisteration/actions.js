import {
  REGISTER_USER,
  REGISTERATION_SUCCESS,
  REGISTERATION_FAILURE,
} from './actionTypes';

export const register = () => {
  return {
    type: REGISTER_USER,
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTERATION_SUCCESS,
  };
};

export const registerationFailure = () => {
  return {
    type: REGISTERATION_FAILURE,
  };
};
