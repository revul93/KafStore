import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../redux/userBooks/actions';
import loadingSpinner from '../img/loading-spinner.gif';

const MyBooks = (props) => {
  const { userId, fetchBooks } = props;
  useEffect(() => {
    fetchBooks(userId);
  }, [userId, fetchBooks]);

  if (!props.isLoggedIn) {
    return <Redirect to='/login' />;
  }

  const loading = (
    <img src={loadingSpinner} alt='loading' className='page-load' />
  );
  const viewList =
    props.viewList.length === 0 ? (
      <div>{'لا يوجد كتب لعرضها'}</div>
    ) : (
      props.viewList.map((book) => {
        return <div key={book.id}>{book.name}</div>;
      })
    );

  return (
    <div>
      <Link to='/user/books/addbook'>Add Book</Link>
      {props.loading ? loading : viewList}
    </div>
  );
};

MyBooks.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  viewList: PropTypes.array.isRequired,
  fetchBooks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    userId: state.auth.userId,
    loading: state.userBooks.loading,
    viewList: state.userBooks.view,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: (userId) => dispatch(fetchBooks(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
