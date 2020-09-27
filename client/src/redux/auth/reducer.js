import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actionTypes';

const initialState = {
  token: localStorage.getItem('x-auth-token') || '',
  userId: localStorage.getItem('userId') || '',
  isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  loading: false,
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
      localStorage.setItem('userId', action.payload.user.id);
      localStorage.setItem('isAdmin', action.payload.user.isAdmin);
      localStorage.setItem('isLoggedIn', true);
      return {
        ...state,
        token: localStorage.getItem('x-auth-token'),
        userId: localStorage.getItem('userId'),
        isAdmin: JSON.parse(localStorage.getItem('isAdmin')),
        isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
        loading: false,
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
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isLoggedIn');
      return {
        ...state,
        token: '',
        userId: '',
        isAdmin: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
