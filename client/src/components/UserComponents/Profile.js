// modules
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';

// helpers
import getUser from '../../utils/getUser';
import getBooksOfUser from '../../utils/getBooksOfUser';
import BooksContainer from '../SubComponents/BooksContainer';
import getUserRating from '../../utils/getUserRating';

// static
import loadingSpinner from '../../img/loading-spinner.gif';
import '../../stylesheet/Profile.css';

const Profile = (props) => {
  const {
    match: {
      params: { user_id },
    },
    userId,
    token,
    isLoggedIn,
  } = props;

  const [loading, setLoading] = useState(true);
  const [rated, setRated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState();
  const [userBooks, setUserBooks] = useState();
  const [view, setView] = useState('Books');
  const { register, handleSubmit } = useForm();

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

  const submitReview = async (data) => {
    setSubmitting(true);
    try {
      await axios.post(
        '/api/review',
        { ...data, user_id },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }
      );
      swal({
        title: 'تم  تقييم البائع بنجاخ',
        text: 'تقييماتك مفيدة لنا وللمستخدمين الآخرين، شكرا!',
        buttons: 'موافق',
        icon: 'success',
      }).then(() => {
        setRated(true);
        setLoading(true);
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
      });
    } catch (error) {
      console.error(error.response);
      swal({
        title: 'حدث خطأ ما',
        text: 'يرجى المحاولة لاحقا',
        buttons: 'موافق',
        icon: 'error',
      });
    }
  };

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
                <span className='userpage-info-element'>
                  {`تقييم المستخدمين: ${
                    getUserRating(user) || 'لم يتم تقييم هذا البائع'
                  }`}
                </span>
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
              {view === 'Reviews' && (
                <>
                  {user.review ? (
                    <div className='review-container'>
                      {user.review.map((review, index) => (
                        <div key={index} className='review'>
                          <Link
                            className='review-info-name'
                            to={`/profile/${review.writer._id}`}
                          >
                            {review.writer.name}
                          </Link>
                          <span className='review-info'>{`${review.rating} من 5`}</span>
                          <span className='review-info'>{review.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='no-reviews'>{'لم يتم إضافة أي تقييم'}</div>
                  )}
                  {!isLoggedIn && (
                    <Link className='no-reviews' to='/login'>
                      {`قم بتسجيل الدخول لتقييم هذا البائع`}
                    </Link>
                  )}
                  {isLoggedIn &&
                    !rated &&
                    user.review.filter((review) => review.writer._id === userId)
                      .length === 0 &&
                    userId.toString() !== user_id.toString() && (
                      <div
                        className='form-container'
                        style={{ height: 'auto' }}
                      >
                        <h3 className='form-title'>{`قيم هذا البائع`}</h3>
                        <form
                          className='form'
                          onSubmit={handleSubmit(submitReview)}
                        >
                          <label className='form-control-label'>
                            {'اختر التقييم من 1 إلى 5'}
                          </label>
                          <select
                            name='rating'
                            className='form-control'
                            ref={register()}
                          >
                            {[
                              { rating: 1, value: 'لا ينصح بالتعامل معه' },
                              { rating: 2, value: 'بائع عادي' },
                              { rating: 3, value: 'بائع جيد' },
                              { rating: 4, value: 'بائع ممتاز' },
                              { rating: 5, value: 'فوق الوصف' },
                            ].map((elem) => (
                              <option key={elem.rating} value={elem.rating}>
                                {`${elem.rating}: ${elem.value}`}
                              </option>
                            ))}
                          </select>

                          <label className='form-control-label'>
                            {'نص التقييم'}
                          </label>
                          <textarea
                            name='text'
                            className='form-control'
                            style={{ height: '100px' }}
                            ref={register()}
                          ></textarea>
                          {submitting ? (
                            <img
                              className='form-control form-loading-spinner'
                              src={loadingSpinner}
                              alt='loading'
                            />
                          ) : (
                            <input
                              className='form-control form-control-submit'
                              type='submit'
                              value='تسجيل'
                            />
                          )}
                        </form>
                      </div>
                    )}
                </>
              )}
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
export default connect(mapStateToProps, null)(Profile);
