import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getBooks from '../utils/getBooks';
import loadingSpinner from '../img/loading-spinner.gif';

const BooksContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState();
  const { query, title } = props;
  useEffect(() => {
    getBooks(query).then((res, err) => {
      if (err) {
        console.error(err.message);
        setLoading(false);
      }
      if (res) {
        res.forEach(
          (book) => (book.copy = book.copy.filter((copy) => !copy.isSold))
        );
      }
      setBooks(res && res.filter((book) => book.copy.length > 0));
      setLoading(false);
    });
  }, [query]);

  return (
    <div className='container'>
      <h3 className='books-container-title'>{title}</h3>
      <div className='books-container'>
        {loading ? (
          <img src={loadingSpinner} alt='loading' className='page-load' />
        ) : books && books.length > 0 ? (
          books.map((book) => (
            <div className='book' key={book._id}>
              <Link className='book-link' to={`/book/${book._id}`}>
                <img
                  className='book-cover'
                  src={book.coverImage}
                  alt='غلاف الكتاب'
                />
                <span className='book-title'>{book.title}</span>
                <span className='book-author'>{book.author}</span>
              </Link>
            </div>
          ))
        ) : (
          <div className='no-books'>لا يوجد كتب لعرضها</div>
        )}
      </div>
    </div>
  );
};

export default BooksContainer;
