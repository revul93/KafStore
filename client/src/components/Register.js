import React from 'react';
const Register = () => {
  return (
    <form>
      <div className='control-group'>
        <label>الإسم</label>
        <input type='text' name='name' required />
      </div>
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
        <label>تأكيد كلمة السر</label>
        <input type='password' name='name' required />
      </div>
      <div className='control-group'>
        <label>رقم الهاتف</label>
        <input type='phone' name='phone' required />
      </div>
      <div className='control-group'>
        <label>صورة الملف الشخصي</label>
        <input type='file' name='profilepic' required />
      </div>
      <div className='control-group'>
        <label>الجنس: </label>
        <label>
          <input type='radio' name='gender' value='male' />
          ذكر
        </label>
        <label>
          <input type='radio' name='gender' value='female' />
          أنثى
        </label>
        <label>
          <input type='radio' name='gender' value='unspecified' />
          غير محدد
        </label>
      </div>
      <div className='control-group'>
        <label>الدولة</label>
        <select name='country'></select>
      </div>
      <div className='control-group'>
        <label>المدينة</label>
        <input type='text' name='city' required />
      </div>
      <div className='control-group'>
        <label>الحي</label>
        <input type='text' name='district' required />
      </div>
      <div className='control-group'>
        <label>الشارع</label>
        <input type='text' name='street' required />
      </div>
      <div className='control-group'>
        <label>وصف العنوان</label>
        <input type='text' name='description' required />
      </div>
      <div className='control-group'>
        <label>الرمز البريدي</label>
        <input type='number' name='postal' />
      </div>
      <div className='control-group'>
        <button id='submit' type='submit'>
          تسجيل
        </button>
      </div>
    </form>
  );
};

export default Register;
