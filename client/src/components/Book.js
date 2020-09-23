import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import getBook from '../utils/getBooks';
import { connect } from 'react-redux';
import incrementBookViewCounter from '../utils/incrementBookViewCounter';
import loadingSpinner from '../img/loading-spinner.gif';
import updateUser from '../utils/updateUser';

const Book = (props) => {
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState();
  const {
    match: {
      params: { book_id },
    },
    userId,
    token,
  } = props;
  useEffect(() => {
    getBook(book_id, token).then((res, err) => {
      if (err) {
        console.error(err.message);
        setLoading(false);
      }
      setBook(res);
      updateUser(token, { view: book_id });
      setLoading(false);
    });
    incrementBookViewCounter(book_id);
  }, [book_id, token]);

  return (
    <Fragment>
      {loading ? (
        <img src={loadingSpinner} alt='loading' className='page-load' />
      ) : book ? (
        <div className='book-page-container'>
          <div className='book-page-general-info'>
            <img
              src={book.coverImage}
              alt='cover'
              className='book-page-cover'
            />
            <div className='book-page-info'>
              <p className='book-page-info-element'>
                {book.title}, {book.author}
              </p>
              <p className='book-page-info-element'>
                {book.publisher}, {new Date(book.publicationYear).getFullYear()}
              </p>
              <p className='book-page-info-element'>
                {'لغة الكتاب: '}: {book.language}
              </p>
              <p className='book-page-info-element'>{book.description}</p>
            </div>
          </div>

          <div className='book-page-copies-container'>
            <h3 className='book-page-copies-header'>{'البائعون'}</h3>
            <div className='book-page-copies'>
              {book.copy.map((copy) => (
                <div className='book-page-copy' key='copy._id'>
                  <div className='book-page-copy-info'>
                    <span>
                      {'البائع: '}
                      <Link to={`/user/${copy.seller._id}`}>
                        {copy.seller.name}
                      </Link>
                    </span>
                    <span>{`الحالة: ${copy.condition}`}</span>
                    <span>{`السعر: ${copy.price} ل.س.`}</span>
                  </div>
                  <div className='book-page-copy-images'>
                    {copy.images.map((image, index) => (
                      <a
                        href={image}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='book-page-copy-image'
                        key={index}
                      >
                        <img src={image} alt='book sample' />
                      </a>
                    ))}
                  </div>
                  {userId !== copy.seller._id ? (
                    <Link
                      className='button book-page-copy-buy-button'
                      to={`/buy/${book_id}/${copy._id}`}
                    >
                      {'شراء'}
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='no-books'>{'الكتاب المطلوب غير موجود'}</div>
      )}
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  token: state.auth.token,
  userId: state.auth.userId,
});
export default connect(mapStatetoProps, null)(Book);
