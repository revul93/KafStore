import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import loadingSpinner from '../../img/loading-spinner.gif';

const AddBookForm = (props) => {
  const focusInput = useRef(null);
  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const { book } = props;
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const submit = async (data) => {
    setLoading(true);
  };
  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
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
          value='التالي'
        />
      )}
    </form>
  );
};

export default AddBookForm;
