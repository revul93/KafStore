// modules
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import axios from 'axios';

//helpers
import getAllUsers from '../../utils/getAllUsers';

// static
import loadingSpinner from '../../img/loading-spinner.gif';

const ComplaintsManagement = (props) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [complaints, setComplaints] = useState(null);
  const { isLoggedIn, token, isAdmin } = props;

  useEffect(() => {
    getAllUsers(token).then((users) => {
      if (!users) {
        setPageLoading(false);
        return;
      } else {
        const usersComplaints = [];
        users.forEach(
          (user) =>
            user.complaint &&
            user.complaint.forEach((complaint) => {
              usersComplaints.push({
                ...complaint,
                userName: user.name,
                userId: user._id,
              });
            }),
        );
        setComplaints(usersComplaints);
        setPageLoading(false);
      }
    });
  }, []);

  const editComplaint = async () => {};

  if (!isAdmin) {
    return <Redirect to='/' />;
  }

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (pageLoading) {
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
  }

  return (
    <>
      {complaints && complaints.length > 0 ? (
        <div className='orderpage-container'>
          <h3 className='orderpage-title'>{'الشكاوى'}</h3>
          <div className='myorders-container'>
            <div className='order-row order-row-header'>
              <span className='order-row-info-header'>{'عنوان الشكوى'}</span>
              <span className='order-row-info-header'>{'تفاصيل الشكوى'}</span>
              <span className='order-row-info-header'>{'الإجراء'}</span>
            </div>
            {complaints.map((complaint, index) => (
              <div key={index} className='order-row'>
                <span className='order-row-info'>{complaint.subject}</span>
                <span className='order-row-info'>
                  <span>{`${complaint.description}`}</span>
                </span>
                <span className='order-row-info'>{complaint.action}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='no-info'>{'لا يوجد شكاوى'}</div>
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

export default connect(mapStateToProps, null)(ComplaintsManagement);
