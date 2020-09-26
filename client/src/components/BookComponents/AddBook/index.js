// modules
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// helpers
import GetBookByISBNForm from './GetBookByISBNForm';
import AddBookForm from './AddBookForm';

// static
import '../../../stylesheet/Forms.css';

const AddBook = (props) => {
  const [book, setBook] = useState(null);
  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='form-container'>
      <h2 className='form-title'>{'إضافة كتاب'}</h2>
      {!book ? (
        <GetBookByISBNForm setBook={setBook} />
      ) : (
        <AddBookForm book={book} />
      )}
    </div>
  );
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
