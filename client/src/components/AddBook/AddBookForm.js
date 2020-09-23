import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';

import loadingSpinner from '../../img/loading-spinner.gif';
import getSections from '../../utils/getSections';
import conditions from '../../utils/conditions';
import s3Upload from '../../utils/s3Upload';

const AddBookForm = (props) => {
  const focusInput = useRef(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sections, setSections] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const { book } = props;

  useEffect(() => {
    if (focusInput.current) focusInput.current.focus();
    getSections().then((data, error) => {
      if (error) {
        setPageLoading(false);
      }
      setSections(data);
      setPageLoading(false);
    });
  }, []);

  const submit = async (data) => {
    setLoading(true);
    const imageArr = ['image_1', 'image_2', 'image_3', 'coverImage'];
    try {
      for (let image of imageArr) {
        if (image === 'coverImage' && book.coverImage) {
          data['coverImage'] = book.coverImage;
          continue;
        }
        if (data[image]) {
          data[image] = await s3Upload(
            data[image][0],
            image === 'coverImage' ? 'coverImage' : 'bookImage'
          );
        }
      }

      data['images'] = `${data.image_1}, ${data.image_2}, ${data.image_3}`;
      imageArr.forEach((image) => {
        if (image !== 'coverImage') {
          delete data[image];
        }
      });

      data.isbn = book.isbn;

      const response = await axios.post('/api/book', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': props.token,
        },
      });

      if (response.status === 200) {
        setLoading(false);
        await swal({
          title: 'تم إضافة الكتاب بنجاح',
          text: 'اضغط موافق للانتقال إلى صفحة الكتب',
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

  if (pageLoading) {
    return <img src={loadingSpinner} alt='loading' className='page-load' />;
  }

  if (success) {
    return <Redirect to='/user/books' />;
  }

  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <h2 className='form-title'>{'إضافة كتاب'}</h2>

      <label className='form-group-label'>{'اسم الكتاب'}</label>
      <input
        name='title'
        type='text'
        className='form-control'
        placeholder='اسم الكتاب'
        defaultValue={book.title || ''}
        ref={(e) => {
          register(e, {
            required: 'يرحى إدخال اسم الكتاب',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يتجاوز اسم الكتاب 255 حرفا',
            },
          });
          focusInput.current = e;
        }}
      />
      {errors.title && (
        <span className='form-error-message'>{errors.title.message}</span>
      )}

      <label className='form-group-label'>{'المؤلف'}</label>
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

      <label className='form-group-label'>{'القسم'}</label>
      {sections ? (
        <select
          name='section'
          className='form-control'
          ref={register({
            required: 'يرحى إدخال اسم القسم',
            maxLength: {
              value: 255,
              message: 'يجب أن لا يتجاوز اسم القسم 255 حرفا',
            },
          })}
          defaultValue={book.section || ''}
        >
          {Object.keys(sections).map((section, index) => (
            <option
              key={index}
              value={section}
              selected={book.section && book.section === section}
            >
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
        type='text'
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
        <span className='form-error-message'>{errors.description.message}</span>
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

      <label className='form-group-label'>{'السعر'}</label>
      <input
        name='price'
        type='number'
        className='form-control'
        placeholder='السعر'
        ref={register({
          required: 'يرحى إدخال السعر',
          maxLength: {
            value: 12,
            message: 'يجب أن لا يتجاوز السعر 12 حرفا',
          },
        })}
      />
      {errors.price && (
        <span className='form-error-message'>{errors.price.message}</span>
      )}

      <label className='form-group-label'>{'حالة الكتاب'}</label>
      <select
        name='condition'
        className='form-control'
        placeholder='الحالة'
        defaultValue={book.condition || false}
        ref={register({
          required: 'يرحى إدخال الحالة',
          maxLength: {
            value: 255,
            message: 'يجب أن لا تتجاوز الحالة 255 حرفا',
          },
        })}
      >
        {Object.keys(conditions).map((condition, index) => {
          return (
            <option key={index} value={conditions[condition]}>
              {conditions[condition]}
            </option>
          );
        })}
      </select>
      {errors.condition && (
        <span className='form-error-message'>{errors.condition.message}</span>
      )}

      {[
        { label: 'صورة الغلاف', name: 'coverImage' },
        { label: 'صورة 1', name: 'image_1' },
        { label: 'صورة 2', name: 'image_2' },
        { label: 'صورة 3', name: 'image_3' },
      ].map((image, index) => {
        if (image.name === 'coverImage' && book.coverImage) return null;
        return (
          <Fragment key={index}>
            <div className='form-group'>
              <label className='form-group-label'>{image.label}</label>
              <input
                name={image.name}
                type='file'
                className='form-control'
                ref={register({
                  required: 'يرجى ارفاق الصور',
                  validate: (value) => {
                    return (
                      value[0].size < 3e6 &&
                      (value[0].type === 'image/jpeg' ||
                        value[0].type === 'image/png')
                    );
                  },
                })}
              />
            </div>
            {errors[image.name] && (
              <span className='form-error-message'>
                {
                  'يجب أن لا يتعدى حجم الملف 3 ميغابايت، وأن يكون بصيغة JPG أو PNG'
                }
              </span>
            )}
          </Fragment>
        );
      })}

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
          value='إضافة'
        />
      )}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps, null)(AddBookForm);
