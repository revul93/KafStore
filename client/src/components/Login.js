import React, { Fragment } from 'react';

const Login = () => {
  return (
    <div className=''>
      <p className='h2'>تسجيل الدخول</p>
      <form>
        <div className='form-group'>
          <label for='exampleInputEmail1'>البريد الإلكتروني</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='form-group'>
          <label for='exampleInputPassword1'>كلمة السر</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          دخول
        </button>
      </form>
    </div>
  );
};

export default Login;
