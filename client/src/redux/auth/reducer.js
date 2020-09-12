import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actionTypes';

const initialState = {
  loading: false,
  isLoggedIn: false,
  isAdmin: false,
  token: '',
  error: '',
  userId: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        isLoggedIn: true,
        error: '',
        userId: action.payload.user.id,
        isAdmin: action.payload.user.isAdmin,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
