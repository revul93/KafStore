import React from 'react';
const Register = () => {
  return (
    <form>
      <h2>تسجيل مستحدم جديد</h2>
      <input type='text' name='name' placeholder='الإسم' required />
      <input
        type='email'
        name='email'
        placeholder='البريد الإلكتروني'
        required
      />
      <input type='password' name='password' placeholder='كلمة السر' required />
      <input
        type='password'
        name='name'
        placeholder='تأكيد كلمة السر'
        required
      />
      <input type='phone' name='phone' placeholder='رقم الهاتف' required />

      <label>صورة الملف الشخصي</label>
      <input type='file' name='profilepic' />
      <div class='control-group'>
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

      <input type='text' name='country' placeholder='الدولة' required />
      <input type='text' name='city' placeholder='المدينة' required />
      <input type='text' name='district' placeholder='الحي' required />
      <input type='text' name='street' placeholder='الشارع' required />
      <input
        type='text'
        name='description'
        placeholder='وصف العنوان'
        required
      />
      <input type='number' name='postal' placeholder='الرمز البريدي' />
      <button id='submit' type='submit'>
        تسجيل
      </button>
    </form>
  );
};

export default Register;
