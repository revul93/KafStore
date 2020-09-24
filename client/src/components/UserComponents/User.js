// modules
import React, { useState, useEffect, Fragment } from 'react';

// helpers
import getUser from '../../utils/getUser';
import getBooksOfUser from '../../utils/getBooksOfUser';

// static
import loadingSpinner from '../../img/loading-spinner.gif';
import '../../stylesheet/User.css';

const User = (props) => {
  const {
    match: {
      params: { user_id },
    },
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
    <Fragment>
      {user ? (
        <Fragment>
          <div className='userpage-container'>
            <div className='userpage-info-container'>
              <img
                className='userpage-profilepic'
                src={user.profilepic}
                alt='صورة المستخدم'
              />
              <div className='userpage-info'>
                <span className='userpage-info-name'>{user.name}</span>
                <span className='userpage-info-name'>{`${user.address.country}، ${user.address.city}`}</span>
                <span className='userpage-info-name'>{`تاريخ الانضضمام: ${new Date(
                  user.date
                ).toDateString()}`}</span>
                <span className='userpage-info-name'>{`عدد الكتب المضافة: ${userBooks.length}`}</span>
              </div>
            </div>
            <div className='view-toggler'>
              <button onClick={() => setView('Books')}>{'الكتب'}</button>
              <button onClick={() => setView('Reviews')} value='Reviews'>
                {'التقييمات'}
              </button>
              <div className='view-container'>
                {view === 'Books' && <p>Books</p>}
                {view === 'Reviews' && <p>Reviews</p>}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className='no-user'>{'المستخدم غير موجود'}</div>
      )}
    </Fragment>
  );
};

export default User;
