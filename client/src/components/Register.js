import React, { useRef, useEffect } from 'react';

const Register = () => {
  const primaryInput = useRef(null);
  useEffect(() => {
    primaryInput.current.focus();
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <form className='form' onSubmit={(e) => formSubmitHandler(e)}>
      <h2 className='form-title'>التسجيل</h2>
      <input
        type='text'
        className='form-control'
        placeholder='الإسم'
        name='name'
        required
        ref={primaryInput}
      />
      <input
        type='email'
        className='form-control ltr'
        placeholder='البريد الإلكتروني'
        name='email'
        required
      />
      <input
        type='password'
        className='form-control ltr'
        placeholder='كلمة السر'
        name='password'
        required
        autoComplete='on'
      />
      <input
        type='password'
        className='form-control ltr'
        placeholder='تأكيد كلمة السر'
        name='passwordConfirmation'
        required
        autoComplete='off'
      />
      <input
        type='text'
        className='form-control'
        placeholder='رقم الهاتف'
        name='phone'
        required
      />
      <div className='form-control form-group'>
        <label className='form-group-label'>صورة الملف الشخصي</label>
        <input type='file' className='form-control' name='profilepic' />
      </div>
      <div className='form-control form-group'>
        <label className='form-group-label'>الجنس</label>
        <input
          type='radio'
          className='form-control'
          name='gender'
          value='male'
        />
        <label>ذكر</label>
        <input
          type='radio'
          className='form-control'
          name='gender'
          value='female'
        />
        <label>أنثى</label>
        <input
          type='radio'
          className='form-control'
          name='gender'
          value='unspecified'
        />
        <label>غير محدد</label>
      </div>
      <input
        type='text'
        className='form-control'
        placeholder='بلد الإقامة'
        name='country'
        required
      />
      <input
        type='text'
        className='form-control'
        placeholder='المدينة'
        name='city'
        required
      />
      <input
        type='text'
        className='form-control'
        placeholder='الحي'
        name='district'
        required
      />
      <input
        type='text'
        className='form-control'
        placeholder='الشارع'
        name='street'
        required
      />
      <input
        type='text'
        className='form-control'
        placeholder='وصف العنوان'
        name='description'
      />
      <input
        type='text'
        className='form-control'
        placeholder='الرمز البريدي'
        name='postal'
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

export default Register;
