// modules
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';

// helpers
import getBook from '../../utils/getBooks';
import getSections from '../../utils/getSections';
import s3Upload from '../../utils/s3Upload';

// static
import '../../stylesheet/Forms.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const AdminBookEdit = (props) => {
  const {
    match: {
      params: { book_id },
    },
    isLoggedIn,
    isAdmin,
    token,
  } = props;

  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [sections, setSections] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    getBook(book_id)
      .then((res, err) => {
        if (err) {
          console.error(err.message);
          setPageLoading(false);
        }
        setBook(res);
      })
      .then(() => {
        getSections().then((data, error) => {
          if (error) {
            setPageLoading(false);
          }
          setSections(data);
          setPageLoading(false);
        });
      });
  }, [book_id]);

  const submit = async (data) => {
    setSubmitLoading(true);
    try {
      if (data.coverImage[0]) {
        data.coverImage = await s3Upload(data.coverImage[0], 'coverImage');
      } else {
        data.coverImage = '';
      }

      await axios.put('/api/book', JSON.stringify({ ...data, book_id }), {
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

  if (!isAdmin) {
    return <Redirect to='/' />;
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
    return <Redirect to='/admin/books' />;
  }

  return (
    <div className='form-container' onSubmit={handleSubmit(submit)}>
      <h3 className='form-title'>{'تعديل كتاب'}</h3>
      <form className='form'>
        <label className='form-control-label'>{`اسم الكتاب:`}</label>
        <input
          name='title'
          type='text'
          className='form-control'
          placeholder='اسم الكتاب'
          defaultValue={book.title}
          ref={register({
            required: 'يرحى إدخال اسم الكتاب',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يتجاوز اسم الكتاب 255 حرفا',
            },
          })}
        />
        {errors.title && (
          <span className='form-error-message'>{errors.title.message}</span>
        )}

        <label className='form-control-label'>{`المؤلف:`}</label>
        <input
          name='author'
          type='text'
          className='form-control'
          placeholder='اسم المؤلف'
          defaultValue={book.author || ''}
          ref={register({
            required: 'يرحى إدخال اسم المؤلف',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يتجاوز اسم المؤلف 255 حرفا',
            },
          })}
        />
        {errors.author && (
          <span className='form-error-message'>{errors.author.message}</span>
        )}

        <label className='form-control-label'>{`رقم الكتاب:`}</label>
        <input
          name='isbn'
          type='text'
          className='form-control ltr'
          defaultValue={book.isbn}
          placeholder='أدخل رقم الكتاب ISBN'
          ref={register({
            required: 'يرجى إدخال رقم ISBN',
            validate: (value) => value.length === 10 || value.length === 13,
          })}
        />
        {errors.isbn && (
          <span className='form-error-message'>
            {'رقم ISBN يجب أن يكون مكونا من عشر أو ثلاثة عشر رقما'}
          </span>
        )}

        <label className='form-group-label'>{'القسم'}</label>
        {sections ? (
          <select
            name='section'
            className='form-control'
            defaultValue={book.section || sections[0]}
            ref={register({
              required: 'يرحى إدخال اسم القسم',
              maxLength: {
                value: 255,
                message: 'يجب أن لا يتجاوز اسم القسم 255 حرفا',
              },
            })}
          >
            {Object.keys(sections).map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        ) : (
          <input
            name='section'
            type='text'
            className='form-control'
            placeholder='القسم'
            defaultValue={book.section || ''}
            ref={register({
              required: 'يرحى إدخال اسم القسم',
              maxLength: {
                value: 255,
                message: 'يجب أن لا يتجاوز اسم القسم 255 حرفا',
              },
            })}
          />
        )}
        {errors.section && (
          <span className='form-error-message'>{errors.section.message}</span>
        )}

        <label className='form-group-label'>{'وصف الكتاب'}</label>
        <textarea
          name='description'
          style={{ height: '300px' }}
          className='form-control textarea'
          placeholder='الوصف'
          defaultValue={book.description || ''}
          ref={register({
            required: 'يرحى إدخال الوصف',
            maxLength: {
              value: 500,
              message: 'يجب أن لا يتجاوز الوصف 500 حرفا',
            },
          })}
        />
        {errors.description && (
          <span className='form-error-message'>
            {errors.description.message}
          </span>
        )}

        <label className='form-group-label'>{'الناشر'}</label>
        <input
          name='publisher'
          type='text'
          className='form-control'
          placeholder='دار النشر'
          defaultValue={book.publisher || ''}
          ref={register({
            required: 'يرحى إدخال اسم دار النشر',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يتجاوز اسم دار النشر 255 حرفا',
            },
          })}
        />
        {errors.publisher && (
          <span className='form-error-message'>{errors.publisher.message}</span>
        )}

        <label className='form-group-label'>{'تاريخ النشر'}</label>
        <input
          name='publicationYear'
          type='number'
          className='form-control'
          placeholder='تاريخ النشر'
          defaultValue={
            book.publicationYear
              ? new Date(book.publicationYear).getFullYear()
              : ''
          }
          ref={register({
            required: 'يرحى إدخال تاريخ النشر',
            min: {
              value: 1500,
              message: 'يرجى إدخال تاريخ صالح',
            },
            max: {
              value: 2021,
              message: 'يرجى إدخال تاريخ صالح',
            },
          })}
        />
        {errors.publicationYear && (
          <span className='form-error-message'>
            {errors.publicationYear.message}
          </span>
        )}

        <label className='form-group-label'>{'لغة الكتاب'}</label>
        <input
          name='language'
          className='form-control'
          defaultValue={book.language}
          ref={register({
            required: 'يرحى إدخال لغة الكتاب',
            maxLength: {
              value: 50,
              message: 'يجب أن لا يتجاوز لغة الكتاب 50 حرفا',
            },
          })}
        />
        {errors.language && (
          <span className='form-error-message'>{errors.language.message}</span>
        )}

        <div className='form-control'>
          <label className='form-control-label'>
            {'صورة الغلاف'}
            <img
              src={book.coverImage}
              alt='صورة الغلاف'
              className='form-control-image'
              style={{ display: 'block', maxWidth: '160px', margin: '5px' }}
            />
          </label>
          <input
            name='coverImage'
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
        {errors.coverImage && (
          <span className='form-error-message'>
            {'يجب أن لا يتعدى حجم الملف 1 ميغابايت، وأن يكون بصيغة JPG'}
          </span>
        )}

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
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userId: state.auth.userId,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps, null)(AdminBookEdit);
