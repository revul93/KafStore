// modules
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

// helpers
import getAllUsers from '../../utils/getAllUsers';
import getUserRating from '../../utils/getUserRating';

// static
import '../../stylesheet/UserManagement.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const UsersManagement = (props) => {
  const [users, setUsers] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { isLoggedIn, token, isAdmin } = props;

  useEffect(() => {
    getAllUsers(token).then((users) => {
      if (!users) {
        setPageLoading(false);
        return;
      } else {
        setUsers(users);
        setPageLoading(false);
      }
    });
  }, [token]);

  const deleteUser = async (user_id) => {
    swal({
      title: ' هل أنت متأكد !',
      text: 'سوف يتم حذف المستخدم نهائيا. استمرار؟',
      icon: 'warning',
      buttons: ['إلغاء', 'موافق'],
      dangerMode: true,
    }).then((willDelete) => {
      setPageLoading(true);
      if (willDelete) {
        axios
          .delete('/api/user', {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json',
            },
            data: { user_id },
          })
          .then((res) => {
            if (res) {
              getAllUsers(token).then((users) => {
                if (!users) {
                  setPageLoading(false);
                  return;
                } else {
                  setUsers(users);
                  setPageLoading(false);
                }
              });
            }
          });
      }
      setPageLoading(false);
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
      {users && users.length > 0 ? (
        <div className='users-container'>
          <h2 className='user-container-title'>{'المستخدمون المسجلون:'}</h2>
          {users.map((user) => (
            <div key={user._id} className='user-container'>
              <img
                className='user-profilepic'
                src={user.profilepic}
                alt='صورة المستخدم'
              />
              <div className='userinfo-container'>
                <span className='userinfo-name'>{user.name}</span>
                <span className='userinfo-element'>
                  {`تقييم المستخدمين: ${
                    getUserRating(user) || 'لم يتم تقييم هذا البائع'
                  }`}
                </span>
                <span className='userinfo-element'>{`${user.address.country}، ${user.address.city}`}</span>
                <span className='userinfo-element'>{`تاريخ الانضمام: ${new Date(
                  user.date
                ).toDateString()}`}</span>
                <div className='form users-control'>
                  <button
                    className='form-control form-control-submit user-buttons'
                    onClick={(event) => {
                      event.preventDefault();
                      deleteUser(user._id);
                    }}
                  >
                    {'حذف'}
                  </button>
                  <Link
                    to={`/profile/${user._id}`}
                    className='form-control form-control-submit user-buttons'
                  >
                    {'عرض'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-info'>{'لا يوجد مستخدمين مسجلين'}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  token: state.auth.token,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(UsersManagement);
