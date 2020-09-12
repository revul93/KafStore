import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import userBooksReducer from './userBooks/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userBooks: userBooksReducer,
});

export default rootReducer;
