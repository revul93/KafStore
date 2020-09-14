import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actionTypes';

const initialState = {
  loading: false,
  isAdmin: Boolean(localStorage.getItem('isAdmin')),
  token: localStorage.getItem('x-auth-token'),
  userId: localStorage.getItem('userId'),
  isLoggedIn: Boolean(localStorage.getItem('isLoggedIn')),
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('x-auth-token', action.payload.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', action.payload.user.id);
      localStorage.setItem('isAdmin', action.payload.user.isAdmin);
      return {
        ...state,
        loading: false,
        token: localStorage.getItem('x-auth-token'),
        isLoggedIn: true,
        userId: localStorage.getItem('userId'),
        isAdmin: Boolean(localStorage.getItem('isAdmin')),
        error: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case LOGOUT:
      localStorage.removeItem('x-auth-token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
