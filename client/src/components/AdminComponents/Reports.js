// modules
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// static
import loadingSpinner from '../../img/loading-spinner.gif';

const Reports = (props) => {
  const [pageLoading, setPageLoading] = useState(true);
  const { isLoggedIn, token, isAdmin } = props;

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (pageLoading) {
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
  }

  return <div>User</div>;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  token: state.auth.token,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(Reports);
