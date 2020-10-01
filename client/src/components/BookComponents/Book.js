// modules
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// helpers
import getBook from '../../utils/getBooks';
import updateUser from '../../utils/updateUser';
import incrementBookViewCounter from '../../utils/incrementBookViewCounter';
import getUserRating from '../../utils/getUserRating';

// static
import loadingSpinner from '../../img/loading-spinner.gif';
import '../../stylesheet/Book.css';

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
      res.copy = res.copy.filter((copy) => !copy.isSold);
      setBook(res);
      updateUser(token, { view: book_id });
      setLoading(false);
    });
    incrementBookViewCounter(book_id);
  }, [book_id, token]);

  if (loading) {
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
  }

  return (
    <Fragment>
      {book ? (
        <Fragment>
          <div className='bookpage-container'>
            <img src={book.coverImage} alt='cover' className='bookpage-cover' />
            <div className='bookpage-info-container'>
              <p className='bookpage-title'>
                {`${book.title}،`} {book.author}
              </p>
              <p className='bookpage-info'>
                {`الناشر وتاريخ النشر: ${book.publisher} - ${new Date(
                  book.publicationYear
                ).getFullYear()}`}
              </p>
              <p className='bookpage-info'>
                {'لغة الكتاب: '} {book.language}
              </p>
              <p className='bookpage-info'>{`رقم الكتاب: ${book.isbn}`}</p>
              <p className='bookpage-info'>{`الوصف: ${book.description}`}</p>
            </div>
          </div>

          <h3 className='bookpage-copy-title'>{'البائعون'}</h3>
          <div className='bookpage-container copy-container'>
            {book.copy.length === 0 && (
              <h3 className='no-info'>{'لا يوجد بائعين لهذا الكتاب'}</h3>
            )}
            {book.copy.map((copy) => (
              <div className='bookpage-copy' key={copy._id}>
                <div className='bookpage-copy-info'>
                  <span className='bookpage-copy-info-element'>
                    {'البائع: '}
                    <Link to={`/profile/${copy.seller._id}`}>
                      {`${copy.seller.name}`}
                    </Link>
                    {` | ${getUserRating(copy.seller)}`}
                  </span>
                  <span className='bookpage-copy-info-element'>{`الحالة: ${copy.condition}`}</span>
                  <span className='bookpage-copy-info-element'>{`السعر: ${copy.price} ل.س.`}</span>
                </div>
                <div className='bookpage-copy-images-container'>
                  {copy.images.map((image, index) => (
                    <a
                      href={image}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bookpage-copy-image'
                      key={index}
                    >
                      <img src={image} alt='book sample' />
                    </a>
                  ))}
                </div>
                {userId !== copy.seller._id ? (
                  <Link
                    className='button bookpage-copy-buy-button'
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
        </Fragment>
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
