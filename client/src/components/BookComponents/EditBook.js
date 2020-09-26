// modules
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';

// helpers
import getBook from '../../utils/getBooks';
import conditions from '../../utils/conditions';

// static
import '../../stylesheet/Forms.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const EditBook = (props) => {
  const {
    match: {
      params: { book_id, copy_id },
    },
    isLoggedIn,
    token,
  } = props;
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    getBook(book_id).then((res, err) => {
      if (err) {
        console.error(err.message);
        setPageLoading(false);
      }
      res.copy = res.copy.filter((elem) => elem._id === copy_id);
      setBook(res);
      setPageLoading(false);
    });
  }, [book_id, copy_id]);

  const submit = async (data) => {
    setSubmitLoading(true);
    try {
      data = {
        ...data,
        book_id,
        copy_id,
      };
      await axios.put('/api/book', data, {
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
    return <Redirect to='/user/books' />;
  }

  return (
    <div className='form-container' onSubmit={handleSubmit(submit)}>
      <h3 className='form-title'>{'تعديل كتاب'}</h3>
      <form className='form'>
        <label className='form-control-label'>{`اسم الكتاب: ${book.title}`}</label>
        <label className='form-control-label'>{`المؤلف: ${book.author}`}</label>
        <label className='form-control-label'>{`رقم الكتاب: ${book.isbn}`}</label>
        <label className='form-control-label'>{`دار النشر: ${book.publisher}`}</label>
        <label className='form-control-label'>{`سنة النشر: ${new Date(
          book.publicationYear
        ).toLocaleDateString()}`}</label>

        <label className='form-control-label'>{'حالة الكتاب'}</label>
        <select
          name='condition'
          className='form-control'
          placeholder='الحالة'
          defaultValue={book.copy[0].condition}
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

        <label className='form-control-label'>{'السعر'}</label>
        <input
          name='price'
          type='number'
          className='form-control'
          placeholder='السعر'
          defaultValue={book.copy[0].price}
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
});

export default connect(mapStateToProps, null)(EditBook);
