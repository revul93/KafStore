// modules
import React, { useRef, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';

// helpers
import s3Upload from '../../utils/s3Upload';

// static
import '../../stylesheet/Forms.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const Register = () => {
  const focusInput = useRef(null);
  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const { register, handleSubmit, errors, watch } = useForm();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    try {
      if (data.profilepic[0]) {
        data.profilepic = await s3Upload(data.profilepic[0], 'profilepic');
      } else {
        data.profilepic = '';
      }
      const response = await axios.post('/api/user/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setLoading(false);
        await swal({
          title: 'تم التسجيل بنجاح',
          text: 'اضغط موافق للانتقال إلى صفحتك الشخصية',
          icon: 'success',
          buttons: 'موافق',
        });
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      swal({
        title: 'حدث خطأ ما',
        text: `${
          error.response ? error.response.data.errors[0].msg : error.message
        }`,
        icon: 'error',
        buttons: 'موافق',
      });
    }
  };

  if (success) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='form-container'>
      <h2 className='form-title'>{'التسجيل'}</h2>
      <form className='form' onSubmit={handleSubmit(submit)}>
        <input
          name='name'
          type='text'
          className='form-control'
          placeholder='الإسم'
          ref={(e) => {
            register(e, {
              required: 'يرجى إدخال الإسم',
              maxLength: {
                value: 255,
                message: 'لا يمكن أن يكون الاسم أطول من 255 حرفا',
              },
            });
            focusInput.current = e;
          }}
        />
        {errors.name && (
          <span className='form-error-message'>{errors.name.message}</span>
        )}

        <input
          name='email'
          type='email'
          className='form-control ltr'
          placeholder='البريد الإلكتروني'
          ref={register({
            required: 'يجب إدخال البريد الإلكتروني',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'يجب إدخال بريد إلكتروني صالح',
            },
            maxLength: {
              value: 255,
              message: 'يجب أن لا يتجاوز البريد الإلكتروني 255 حرفا',
            },
          })}
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
            minLength: {
              value: 6,
              message: 'يجب أن لا يقل طول كلمة السر عن 6 أحرف',
            },
          })}
        />
        {errors.password && (
          <span className='form-error-message'>{errors.password.message}</span>
        )}

        <input
          name='passwordConfirmation'
          type='password'
          className='form-control ltr'
          placeholder='تأكيد كلمة السر'
          autoComplete='off'
          ref={register({
            validate: (value) => value === watch('password'),
          })}
        />
        {errors.passwordConfirmation && (
          <span className='form-error-message'>
            {'كلمتا السر غير متطابقتان'}
          </span>
        )}

        <input
          name='phone'
          type='text'
          className='form-control ltr'
          placeholder='رقم الهاتف'
          ref={register({
            required: 'يرجى إدخال رقم الهاتف',
            pattern: {
              value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g,
              message: 'يرجى إدخال رقم هاتف صالح',
            },
          })}
        />
        {errors.phone && (
          <span className='form-error-message'>{errors.phone.message}</span>
        )}

        <div className='form-control'>
          <label className='form-group-label'>{'صورة الملف الشخصي'}</label>
          <input
            name='profilepic'
            type='file'
            className='form-control'
            ref={register({
              validate: (value) => {
                return (
                  value[0] &&
                  value[0].size < 1048576 &&
                  (value[0].type === 'image/jpeg' ||
                    value[0].type === 'image/png')
                );
              },
            })}
          />
        </div>
        {errors.profilepic && (
          <span className='form-error-message'>
            {'يجب أن لا يتعدى حجم الملف 1 ميغابايت، وأن يكون بصيغة JPG'}
          </span>
        )}

        <div className='form-control'>
          <label className='form-group-label'>{'الجنس'}</label>
          <input
            type='radio'
            className='form-control'
            name='gender'
            value='male'
            ref={register({
              required: 'يرجى اختيار الجنس',
            })}
          />
          <label>{'ذكر'}</label>
          <input
            type='radio'
            className='form-control'
            name='gender'
            value='female'
            ref={register({
              required: 'يرجى اختيار الجنس',
            })}
          />
          <label>{'أنثى'}</label>
          <input
            type='radio'
            className='form-control'
            name='gender'
            value='unspecified'
            ref={register({
              required: 'يرجى اختيار الجنس',
            })}
          />
          <label>{'غير محدد'}</label>
        </div>
        {errors.gender && (
          <span className='form-error-message'>{errors.gender.message}</span>
        )}

        <input
          name='country'
          type='text'
          className='form-control'
          placeholder='بلد الإقامة'
          ref={register({
            required: 'يرجى إدخال بلد الإقامة',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يزيد طول النص عن 255 حرفا',
            },
          })}
        />
        {errors.country && (
          <span className='form-error-message'>{errors.country.message}</span>
        )}

        <input
          name='city'
          type='text'
          className='form-control'
          placeholder='المدينة'
          ref={register({
            required: 'يرجى إدخال المدينة',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يزيد طول النص عن 255 حرفا',
            },
          })}
        />
        {errors.city && (
          <span className='form-error-message'>{errors.city.message}</span>
        )}

        <input
          name='district'
          type='text'
          className='form-control'
          placeholder='الحي'
          ref={register({
            required: 'يرجى إدخال اسم الحي',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يزيد طول النص عن 255 حرفا',
            },
          })}
        />
        {errors.district && (
          <span className='form-error-message'>{errors.district.message}</span>
        )}

        <input
          name='street'
          type='text'
          className='form-control'
          placeholder='الشارع'
          ref={register({
            required: 'يرجى إدخال اسم الشارع',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يزيد طول النص عن 255 حرفا',
            },
          })}
        />
        {errors.street && (
          <span className='form-error-message'>{errors.street.message}</span>
        )}

        <input
          name='description'
          type='text'
          className='form-control'
          placeholder='وصف العنوان'
          ref={register}
        />
        <input
          name='postal'
          type='text'
          className='form-control'
          placeholder='الرمز البريدي'
          ref={register}
        />
        <label className='form-control form-error-message hide'></label>
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

export default Register;
