import React, { useRef, useEffect } from 'react';

const Login = () => {
  const primaryInput = useRef(null);
  useEffect(() => {
    primaryInput.current.focus();
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <form className='form' onSubmit={(e) => formSubmitHandler(e)}>
      <h2 className='form-title'>تسجيل الدخول</h2>
      <input
        type='email'
        className='form-control ltr'
        placeholder='البريد الإلكتروني'
        name='email'
        required
        ref={primaryInput}
      />
      <input
        type='password'
        className='form-control ltr'
        placeholder='كلمة السر'
        name='password'
        required
        autoComplete='on'
      />
      <label className='form-control form-error-message hide'></label>
      <input
        className='form-control form-control-submit'
        type='submit'
        value='دخول'
      />
    </form>
  );
};

export default Login;
