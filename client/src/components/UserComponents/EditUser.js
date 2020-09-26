// modules
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';

// helpers
import getMe from '../../utils/getMe';
import s3Upload from '../../utils/s3Upload';

// static
import '../../stylesheet/Forms.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const EditBook = (props) => {
  const { isLoggedIn, token } = props;
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm();

  useEffect(() => {
    getMe(token).then((res, err) => {
      if (err) {
        console.error(err.message);
        setPageLoading(false);
      }
      setUser(res);
      setPageLoading(false);
    });
  }, [token]);

  const submit = async (data) => {
    setSubmitLoading(true);
    try {
      if (data.profilepic[0]) {
        data.profilepic = await s3Upload(data.profilepic[0], 'profilepic');
      } else {
        data.profilepic = '';
      }
      data = {
        ...data,
      };
      await axios.put('/api/user/edit', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      setSubmitLoading(false);
      await swal({
        title: 'تم التعديل بنجاح',
        buttons: 'موافق',
        icon: 'success',
      });
      setDone(true);
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (pageLoading) {
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
  }

  if (!pageLoading && error) {
    swal({
      title: 'حدث خطأ أثناء التحميل',
      text: error,
      buttons: 'موافق',
      icon: 'error',
    }).then(() => {
      setError('');
      setDone(true);
    });
  }

  if (done) {
    setPageLoading(true);
    getMe(token).then((res, err) => {
      if (err) {
        console.error(err.message);
        setPageLoading(false);
      }
      setUser(res);
      setPageLoading(false);
      setDone(false);
    });
  }

  return (
    <>
      {!pageLoading && (
        <div className='form-container'>
          <h3 className='form-title'>{'معلوماتي'}</h3>
          <form className='form' onSubmit={handleSubmit(submit)}>
            <label className='form-control-label'>{'الإسم'}</label>
            <input
              name='name'
              type='text'
              className='form-control'
              defaultValue={user.name}
              placeholder='الإسم'
              ref={register({
                required: 'يرجى إدخال الإسم',
                maxLength: {
                  value: 255,
                  message: 'لا يمكن أن يكون الاسم أطول من 255 حرفا',
                },
              })}
            />
            {errors.name && (
              <span className='form-error-message'>{errors.name.message}</span>
            )}

            <label className='form-control-label'>{`الإيميل: ${user.email}`}</label>

            <label className='form-control-label'>{`كلمة المرور الجديدة`}</label>
            <input
              name='password'
              type='password'
              className='form-control ltr'
              autoComplete='on'
              ref={register({
                minLength: {
                  value: 6,
                  message: 'يجب أن لا يقل طول كلمة السر عن 6 أحرف',
                },
              })}
            />
            {errors.password && (
              <span className='form-error-message'>
                {errors.password.message}
              </span>
            )}

            <label className='form-control-label'>{`تأكيد كلمة المرور`}</label>
            <input
              name='passwordConfirmation'
              type='password'
              className='form-control ltr'
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

            <label className='form-control-label'>{`رقم الهاتف`}</label>
            <input
              name='phone'
              type='text'
              className='form-control ltr'
              defaultValue={user.phone}
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
              <label className='form-control-label'>
                {'صورة الملف الشخصي'}
                <img
                  src={user.profilepic}
                  alt='صورة شخصية'
                  className='form-control-image'
                  style={{ display: 'block', maxWidth: '160px', margin: '5px' }}
                />
              </label>
              <input
                name='profilepic'
                type='file'
                className='form-control'
                ref={register({
                  validate: (value) => {
                    return (
                      !value[0] ||
                      (value[0] &&
                        value[0].size < 3e6 &&
                        (value[0].type === 'image/jpeg' ||
                          value[0].type === 'image/png'))
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

            <label className='form-control-label'>{`بلد الإقامة`}</label>
            <input
              name='country'
              type='text'
              className='form-control'
              defaultValue={user.address.country}
              ref={register({
                required: 'يرجى إدخال بلد الإقامة',
                maxLength: {
                  value: 255,
                  message: 'يجب أن لا يزيد طول النص عن 255 حرفا',
                },
              })}
            />
            {errors.country && (
              <span className='form-error-message'>
                {errors.country.message}
              </span>
            )}

            <label className='form-control-label'>{`المدينة`}</label>
            <input
              name='city'
              type='text'
              className='form-control'
              defaultValue={user.address.city}
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

            <label className='form-control-label'>{`الحي`}</label>
            <input
              name='district'
              type='text'
              className='form-control'
              defaultValue={user.address.district}
              ref={register({
                required: 'يرجى إدخال اسم الحي',
                maxLength: {
                  value: 255,
                  message: 'يجب أن لا يزيد طول النص عن 255 حرفا',
                },
              })}
            />
            {errors.district && (
              <span className='form-error-message'>
                {errors.district.message}
              </span>
            )}

            <label className='form-control-label'>{`الشارع`}</label>
            <input
              name='street'
              type='text'
              className='form-control'
              defaultValue={user.address.street}
              ref={register({
                required: 'يرجى إدخال اسم الشارع',
                maxLength: {
                  value: 255,
                  message: 'يجب أن لا يزيد طول النص عن 255 حرفا',
                },
              })}
            />
            {errors.street && (
              <span className='form-error-message'>
                {errors.street.message}
              </span>
            )}

            <label className='form-control-label'>{`وصف العنوان`}</label>
            <input
              name='description'
              type='text'
              className='form-control'
              defaultValue={user.address.discription}
              ref={register}
            />

            <label className='form-control-label'>{`الرمز البريدي`}</label>
            <input
              name='postal'
              type='text'
              className='form-control'
              defaultValue={user.address.postal}
              ref={register}
            />

            {submitLoading ? (
              <img
                className='form-control form-loading-spinner'
                src={loadingSpinner}
                alt='loading'
              />
            ) : (
              <input
                className='form-control form-control-submit'
                type='submit'
                value='حفظ التعديلات'
              />
            )}
          </form>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(EditBook);
