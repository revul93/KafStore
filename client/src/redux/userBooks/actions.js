import axios from 'axios';
import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
} from './actionTypes';

export const fetchBooksRequest = () => {
  return {
    type: FETCH_BOOKS_REQUEST,
  };
};

export const fetchBookSuccess = (books) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: {
      books,
    },
  };
};

export const fetchBookFailure = (error) => {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: {
      error,
    },
  };
};

export const fetchBooks = (userId) => {
  return async (dispatch) => {
    dispatch(fetchBooksRequest());
    try {
      const response = await axios.get(`/api/book/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        dispatch(fetchBookSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchBookFailure(error.response.data));
    }
  };
};
