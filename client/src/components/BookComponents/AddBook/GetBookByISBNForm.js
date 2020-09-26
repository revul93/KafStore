// modules
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// helpers
import getBookByISBN from '../../../utils/getBookByISBN';

// static
import loadingSpinner from '../../../img/loading-spinner.gif';

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
            validate: (value) => value.length === 10 || value.length === 13,
          });
          focusInput.current = e;
        }}
      />
      {errors.isbn && (
        <span className='form-error-message'>
          {'رقم ISBN يجب أن يكون مكونا من عشر أو ثلاثة عشر رقما'}
        </span>
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
