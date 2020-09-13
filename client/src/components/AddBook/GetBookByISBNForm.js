import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import getBookByISBN from '../../utils/getBookByISBN';
import loadingSpinner from '../../img/loading-spinner.gif';

const GetBookByISBNForm = (props) => {
  const focusInput = useRef(null);
  useEffect(() => {
    focusInput.current.focus();
  }, []);

  const submit = async (data) => {
    setLoading(true);
    const bookInfo = await getBookByISBN(data.isbn);
    setLoading(false);
    props.setBook(bookInfo);
  };

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <input
        name='isbn'
        type='text'
        className='form-control ltr'
        placeholder='أدخل رقم الكتاب ISBN'
        ref={(e) => {
          register(e, {
            required: 'يرجى إدخال رقم ISBN',
            maxLength: {
              value: 13,
              message: 'رقم ISBN يجب أن لا يتجاوز 13 رقما',
            },
            minLength: {
              value: 10,
              message: 'رقم ISBN يجب أن لا يتجاوز 10 رقما',
            },
          });
          focusInput.current = e;
        }}
      />
      {errors.isbn && (
        <span className='form-error-message'>{errors.isbn.message}</span>
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

export default GetBookByISBNForm;
