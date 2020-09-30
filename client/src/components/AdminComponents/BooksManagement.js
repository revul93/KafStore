// modules
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import axios from 'axios';

//helpers
import getBooks from '../../utils/getBooks';

// static
import loadingSpinner from '../../img/loading-spinner.gif';

const BooksManagement = (props) => {
  const { isLoggedIn, token, isAdmin } = props;
  const [pageLoading, setPageLoading] = useState(true);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    getBooks('_all').then((res, err) => {
      if (err) {
        console.error(err.message);
        setPageLoading(false);
      }
      setBooks(res);
      setPageLoading(false);
    });
  }, []);

  const deleteBook = (bookId) => {
    swal({
      title: ' هل أنت متأكد !',
      text: 'سوف يتم حذف الكتاب نهائيا. هل انت متأكد؟',
      icon: 'warning',
      buttons: ['إلغاء', 'موافق'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const config = {
          headers: {
            'x-auth-token': token,
          },
          data: {
            book_id: bookId,
          },
        };

        axios
          .delete('/api/book', config)
          .then(() => {
            getBooks('_all').then((res, err) => {
              if (err) {
                console.error(err.message);
                setPageLoading(false);
              }
              setBooks(res);
              setPageLoading(false);
            });
            swal('تم حذف الكتاب بنجاح', {
              icon: 'success',
            });
          })
          .catch((err) => {
            console.error(err.message);
            swal('حصل خطأ أثناء تنفيذ العملية', {
              icon: 'error',
            });
          });
      }
    });
  };

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (!isAdmin) {
    return <Redirect to='/' />;
  }

  if (pageLoading) {
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
  }

  return (
    <>
      {books && books.length > 0 ? (
        <div className='user-books-container'>
          {books.map((book) => {
            return (
              <div className='user-book' key={book._id}>
                <img
                  src={book.coverImage}
                  className='user-book-cover'
                  alt='book cover'
                />
                <div className='user-book-info'>
                  {`اسم الكتاب : ${book.title}`} <br />
                  {`اسم المؤلف : ${book.author}`} <br />
                  {`تاريخ الإضافة : ${new Date(
                    book.date
                  ).toLocaleDateString()}`}
                  <br />
                  {`عدد النسخ : ${book.copy.length}`} <br />
                  {`عدد المشاهدات : ${book.viewCounter}`}
                  <br />
                </div>
                <div className='user-book-controls'>
                  <Link
                    className='user-book-button'
                    to={`/book/view/${book._id}`}
                  >
                    {'عرض'}
                  </Link>
                  <button
                    className='user-book-button'
                    onClick={() => deleteBook(book._id)}
                  >
                    {'حذف'}
                  </button>
                  <Link
                    className='user-book-button'
                    to={`/admin/book/edit/${book._id}`}
                  >
                    {'تعديل'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='no-info'>{'لا يوجد كتب لعرضها'}</div>
      )}
    </>
  );
};

BooksManagement.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  token: state.auth.token,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(BooksManagement);
