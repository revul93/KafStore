// modules
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// helpers
import getUser from '../../utils/getUser';
import getBooksOfUser from '../../utils/getBooksOfUser';
import BooksContainer from '../SubComponents/BooksContainer';

// static
import loadingSpinner from '../../img/loading-spinner.gif';
import '../../stylesheet/User.css';

const User = (props) => {
  const {
    match: {
      params: { user_id },
    },
    isLoggedIn,
  } = props;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userBooks, setUserBooks] = useState();
  const [view, setView] = useState('Books');

  useEffect(() => {
    getUser(user_id)
      .then((data) => {
        setUser(data);
      })
      .then(() => {
        getBooksOfUser(user_id).then((data) => {
          setUserBooks(data);
          setLoading(false);
        });
      });
  }, [user_id]);

  if (loading) {
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
  }

  return (
    <>
      {user ? (
        <>
          <div className='userpage-container'>
            <div className='userpage-info-container'>
              <img
                className='userpage-profilepic'
                src={user.profilepic}
                alt='صورة المستخدم'
              />
              <div className='userpage-info'>
                <span className='userpage-info-name'>{user.name}</span>
                <span className='userpage-info-element'>{`${user.address.country}، ${user.address.city}`}</span>
                <span className='userpage-info-element'>{`تاريخ الانضمام: ${new Date(
                  user.date
                ).toDateString()}`}</span>
                <span className='userpage-info-element'>{`عدد الكتب المضافة: ${userBooks.length}`}</span>
              </div>
            </div>
            <div className='view-toggler'>
              <button
                className={`view-toggler-button ${
                  view === 'Books' && 'view-toggler-button-clicked'
                }`}
                onClick={() => setView('Books')}
              >
                {'الكتب'}
              </button>
              <button
                className={`view-toggler-button ${
                  view === 'Reviews' && 'view-toggler-button-clicked'
                }`}
                onClick={() => setView('Reviews')}
                value='Reviews'
              >
                {'التقييمات'}
              </button>
            </div>
            <div className='view-container'>
              {view === 'Books' && <BooksContainer books={userBooks} />}
              {view === 'Reviews' &&
                (user.reviews ? (
                  user.reviews.map((review, index) => <div key={index}></div>)
                ) : (
                  <>
                    <div className='no-reviews'>{'لم يتم إضافة أي تقييم'}</div>
                    {!isLoggedIn && (
                      <Link className='no-reviews' to='/login'>
                        {`قم بتسجيل الدخول لتقييم هذا البائع`}
                      </Link>
                    )}
                    {isLoggedIn && <div></div>}
                  </>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className='no-user'>{'المستخدم غير موجود'}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.token,
  token: state.auth.token,
  userId: state.auth.userId,
});
export default connect(mapStateToProps, null)(User);
