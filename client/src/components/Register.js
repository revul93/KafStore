import React, { useRef, useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Register = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const primaryInput = useRef(null);
  useEffect(() => {
    primaryInput.current.focus();
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      passwordConfirmation: e.target.passwordConfirmation.value,
      phone: e.target.phone.value,
      profilepic: e.target.profilepic.value,
      gender: e.target.gender.value,
      country: e.target.country.value,
      city: e.target.city.value,
      district: e.target.district.value,
      street: e.target.street.value,
      description: e.target.description.value,
      postal: e.target.postal.value,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post('/api/user/register', formData, config);
      if (response.status === 200) {
        await swal({
          title: 'تم التسجيل بنجاح',
          text: 'اضغط موافق للانتقال إلى صفحة تسجيل الدخول',
          icon: 'success',
          buttons: 'موافق',
        });
        setRegisterSuccess(true);
      }
    } catch (error) {
      console.log(error.response.data);
      swal({
        title: 'حدث خطأ ما',
        text: `${error.response.data.errors[0].msg}`,
        icon: 'error',
        buttons: 'موافق',
      });
    }
  };

  return (
    <Fragment>
      {registerSuccess ? (
        <Redirect to='/login' />
      ) : (
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
      )}
    </Fragment>
  );
};

export default Register;
