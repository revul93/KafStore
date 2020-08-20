import React from 'react';

const Login = () => {
  return (
    <form className='form'>
      <h2 className='form-title'>تسجيل الدخول</h2>
      <input
        type='email'
        className='form-control'
        placeholder='البريد الإلكتروني'
        name='email'
        required
      />
      <input
        type='password'
        className='form-control'
        placeholder='كلمة السر'
        name='password'
        required
      />
      <label className='form-control form-error-message'></label>
      <input type='submit' />
    </form>
  );
};

export default Login;
