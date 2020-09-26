// modules
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// helpers
import getBooks from '../../utils/getBooks';

// static
import '../../stylesheet/BooksContainer.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const BooksContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState();
  const { books, query, title, userId } = props;

  useEffect(() => {
    // load books
    if (books) {
      setView(books);
      setLoading(false);
    } else
      getBooks(query, userId).then((res, err) => {
        if (err) {
          console.error(err.message);
          setLoading(false);
        }
        if (res) {
          // remove sold copies of a book
          res.forEach(
            (book) => (book.copy = book.copy.filter((copy) => !copy.isSold))
          );
        }
        // if response -> remove books with 0 available copies
        setView(res && res.filter((book) => book.copy.length > 0));
        setLoading(false);
      });
  }, [query, books, userId]);

  if (loading) {
    return (
      <img
        src={loadingSpinner}
        alt='loading'
        className='books-container-load'
      />
    );
  }

  return (
    <Fragment>
      {title && <h3 className='books-container-title'>{title}</h3>}
      <div className='books-container'>
        {view && view.length > 0 ? (
          view.map((book) => (
            <div className='book' key={book._id}>
              <Link className='book-link' to={`/book/view/${book._id}`}>
                <img
                  className='book-cover'
                  src={book.coverImage}
                  alt='غلاف الكتاب'
                />
                <span className='book-info book-title'>{book.title}</span>
                <span className='book-info book-author'>{book.author}</span>
              </Link>
            </div>
          ))
        ) : (
          <div className='no-books'>{'لا يوجد كتب لعرضها'}</div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(BooksContainer);
