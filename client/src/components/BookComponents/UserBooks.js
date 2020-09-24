import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import loadingSpinner from '../../img/loading-spinner.gif';
import getBooksOfUser from '../../utils/getBooksOfUser';
import swal from 'sweetalert';
import axios from 'axios';

const UserBooks = (props) => {
  const { token, isLoggedIn, userId } = props;
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState(null);
  useEffect(() => {
    getBooksOfUser(userId).then((res, err) => {
      if (err) {
        console.error(err.message);
        setLoading(false);
      }
      setBooks(res);
      setLoading(false);
    });
  }, [userId]);

  const deleteUserBook = (bookId, copyId) => {
    swal({
      title: ' هل أنت متأكد !',
      text: 'سوف يتم حذف الكتاب نهائيا. هل انت متأكد؟',
      icon: 'warning',
      buttons: ['إلغاء', 'موافق'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const data = {
          book_id: bookId,
          copy_id: copyId,
        };
        axios
          .put('/api/book', JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          })
          .then(() => {
            setBooks(books.filter((book) => book.copy._id === copyId));
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

  return (
    <Fragment>
      <Link className='button' to='/user/books/addbook'>
        {'إضافة كتاب'}
      </Link>

      {loading ? (
        <img src={loadingSpinner} alt='loading' className='page-load' />
      ) : books && books.length > 0 ? (
        <div className='user-books'>
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
                  {`السعر : ${book.copy[0].price} ل.س.`} <br />
                  {`الحالة : ${book.copy[0].condition}`} <br />
                  {`تاريخ الإضافة : ${new Date(
                    book.copy[0].date
                  ).toLocaleDateString()}`}{' '}
                  <br />
                  {`عدد المشاهدات : ${book.viewCounter}`}
                  <br />
                </div>
                <div className='user-book-controls'>
                  <button className='user-book-button'>تعديل</button> <br />
                  <button
                    className='user-book-button'
                    onClick={() => deleteUserBook(book._id, book.copy[0]._id)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='no-books'>{'لا يوجد كتب لعرضها'}</div>
      )}
    </Fragment>
  );
};

UserBooks.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(UserBooks);
