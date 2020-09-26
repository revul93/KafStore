// modules
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';

// static
import '../../stylesheet/Forms.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const Complaint = (props) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { token, isLoggedIn } = props;
  const submit = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/complaint', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      swal({
        title: 'تم إرسال الشكوى بنجاح',
        text: 'سوف يقوم مدير النظام بالتواصل معك عن طريق البريد الالكتروني',
        buttons: 'موافق',
        icon: 'success',
      }).then(() => {
        setDone(true);
      });
    } catch (error) {
      console.error(error.response);
      swal({
        title: 'حدث خطأ ما',
        text: 'يرجى المحاولة لاحقا',
        buttons: 'موافق',
        icon: 'error',
      }).then(() => {
        setDone(true);
      });
    }
  };

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (done) {
    return <Redirect to='/user/books' />;
  }

  return (
    <div className='form-container'>
      <h3 className='form-title'>{'تقديم شكوى'}</h3>
      <form className='form' onSubmit={handleSubmit(submit)}>
        <input
          name='subject'
          type='text'
          className='form-control'
          placeholder='موضوع الشكوى'
          ref={register({
            required: 'يرجى إدخال الموضوع',
          })}
        />
        {errors.subject && (
          <span className='form-error-message'>{errors.subject.message}</span>
        )}
        <label className='form-control-label'>
          {'الرجاء كتابة وصف مختصر للمشكلة'}
        </label>
        <textarea
          name='description'
          className='form-control'
          style={{ height: '300px' }}
          ref={register({
            required: 'يرجى إدخال الموضوع',
          })}
        ></textarea>
        {errors.description && (
          <span className='form-error-message'>
            {errors.description.message}
          </span>
        )}

        {loading ? (
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
  );
};

const mapStateToPorps = (state) => ({
  token: state.auth.token,
  isLoggedIn: state.auth.isLoggedIn,
});
export default connect(mapStateToPorps, null)(Complaint);
