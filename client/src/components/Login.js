import React from 'react';

const Login = () => {
  return (
    <form>
      <div className='control-group'>
        <label>البريد الإلكتروني</label>
        <input
          type='email'
          name='email'
          placeholder='someone@example.com'
          required
        />
      </div>
      <div className='control-group'>
        <label>كلمة السر</label>
        <input type='password' name='password' required />
      </div>
      <div className='control-group'>
        <button id='submit' type='submit'>
          تسجيل الدخول
        </button>
      </div>
    </form>
  );
};

export default Login;
