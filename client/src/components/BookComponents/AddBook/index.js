import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GetBookByISBNForm from './GetBookByISBNForm';
import AddBookForm from './AddBookForm';

const AddBook = (props) => {
  const [book, setBook] = useState(null);
  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (!book) {
    return <GetBookByISBNForm setBook={setBook} />;
  } else {
    return <AddBookForm book={book} />;
  }
};

AddBook.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(AddBook);
