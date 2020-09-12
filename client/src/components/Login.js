import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import loadingSpinner from '../img/loading-spinner.gif';
import { login, logout } from '../redux/auth/actions';
import swal from '@sweetalert/with-react';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const focusInput = useRef(null);
  useEffect(() => {
    focusInput.current.focus();
  }, []);
  useEffect(() => {
    if (props.error) {
      swal({
        title: 'حدث خطأ ما!',
        text: props.error,
        icon: 'error',
        buttons: 'إعادة المحاولة',
      }).then(() => {
        props.clear();
      });
    }
  });

  if (props.isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <form className='form' onSubmit={handleSubmit((data) => props.login(data))}>
      <h2 className='form-title'>تسجيل الدخول</h2>
      <input
        name='email'
        type='email'
        className='form-control ltr'
        placeholder='البريد الإلكتروني'
        ref={(e) => {
          register(e, {
            required: 'يرجى إدخال البريد الالكتروني',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'يجب إدخال بريد إلكتروني صالح',
            },
          });
          focusInput.current = e;
        }}
      />
      {errors.email && (
        <span className='form-error-message'>{errors.email.message}</span>
      )}

      <input
        name='password'
        type='password'
        className='form-control ltr'
        placeholder='كلمة السر'
        autoComplete='on'
        ref={register({
          required: 'يرجى إدخال كلمة السر',
        })}
      />
      {errors.password && (
        <span className='form-error-message'>{errors.password.message}</span>
      )}
      {props.loading ? (
        <img
          className='form-control form-loading-spinner'
          src={loadingSpinner}
          alt='loading'
        />
      ) : (
        <input
          className='form-control form-control-submit'
          type='submit'
          value='دخول'
        />
      )}
    </form>
  );
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
    clear: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
