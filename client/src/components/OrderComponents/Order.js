// modules
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

// helpers
import fetchBook from '../../utils/getBooks';
import getMe from '../../utils/getMe';
import placeOrder from '../../utils/placeOrder';

// static
import '../../stylesheet/Forms.css';
import '../../stylesheet/Order.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const Order = (props) => {
  const {
    match: {
      params: { book_id, copy_id },
    },
    token,
    isLoggedIn,
  } = props;

  const [loading, setLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [book, setBook] = useState();
  const [copyIndex, setCopyIndex] = useState();
  const [buyer, setBuyer] = useState();

  useEffect(() => {
    if (!isLoggedIn) {
      swal({
        icon: 'warning',
        text: 'يتوجيب عليك تسجيل الدخول أولا',
        buttons: 'موافق',
      }).then(() => {
        setLoading(false);
      });
    } else
      fetchBook(book_id).then((data) => {
        if (!data) {
          setError('حدث خطأ أثناء التحميل، يرجى المحاولة لاحقا');
          setLoading(false);
          return;
        }
        setBook(data);
        setCopyIndex(data.copy.findIndex((elem) => elem._id === copy_id));
        getMe(token).then((data) => {
          if (!data) {
            setError('حدث خطأ أثناء التحميل، يرجى المحاولة لاحقا');
            setLoading(false);
            return;
          }
          setBuyer(data);
          setLoading(false);
        });
      });
  }, [book_id, isLoggedIn, token, copy_id]);

  const { register, handleSubmit, errors, watch } = useForm();
  const submit = (data) => {
    data.token = token;
    data.seller_id = book.copy[copyIndex].seller._id;
    data.book_id = book_id;
    data.copy_id = copy_id;
    data.amount = book.copy[copyIndex].price;

    placeOrder(data).then((res, err) => {
      setIsPosting(true);
      if (err) {
        swal({
          icon: 'error',
          title: 'فشلت العملية',
          text: err,
          buttons: 'العودة',
        });
      }
      swal({
        icon: 'success',
        title: 'لقد قمت بشراء الكتاب',
        text: 'يمكنك استعراض حالة الطلب في صفحة إدارة طلباتي',
        buttons: 'موافق',
      }).then(() => {
        setIsPosting(false);
        setSuccess(true);
      });
    });
    setIsPosting(true);
  };

  if (loading)
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );

  if (error) {
    return <h3 className='no-info'>{error}</h3>;
  }

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (success) {
    return <Redirect to='/user/orders' />;
  }

  return (
    <div className='orderpage-container'>
      <h3 className='orderpage-title'>{'تفاصيل الطلب'}</h3>
      <div className='orderpage-section'>
        <div className='orderpage-info-element'>
          <span className='orderpage-info-element-label'>{'الكتاب: '}</span>
          <span className='orderpage-info-element-data'>{`${book.title}, ${book.author}`}</span>
        </div>
        <div className='orderpage-info-element'>
          <span className='orderpage-info-element-label'>{'البائع: '}</span>
          <span className='orderpage-info-element-data'>{`${book.copy[copyIndex].seller.name}`}</span>
        </div>
        <div className='orderpage-info-element'>
          <span className='orderpage-info-element-label'>
            {'حالة الكتاب: '}
          </span>
          <span className='orderpage-info-element-data'>{`${book.copy[copyIndex].condition}`}</span>
        </div>
        <div className='orderpage-info-element'>
          <span className='orderpage-info-element-label'>{'السعر: '}</span>
          <span className='orderpage-info-element-data'>{`${book.copy[copyIndex].price} ل.س.`}</span>
        </div>
        <div className='orderpage-info-element'>
          <span className='orderpage-info-element-label'>
            {'اسم المشتري: '}
          </span>
          <span className='orderpage-info-element-data'>{`${buyer.name}`}</span>
        </div>
        <div className='orderpage-info-element'>
          <span className='orderpage-info-element-label'>{'رقم الهاتف: '}</span>
          <span className='orderpage-info-element-data'>{`${buyer.phone}`}</span>
        </div>
        <div className='orderpage-info-element'>
          <span className='orderpage-info-element-label-address'>
            {'عنوان الشحن: '}
          </span>
          <span className='orderpage-info-element-data-address'>
            {`${buyer.address.street}, ${buyer.address.district}, ${buyer.address.city}, ${buyer.address.country}`}
          </span>
          <br />
          <span className='orderpage-info-element-data-address'>{`وصف العنوان: ${buyer.address.description}`}</span>
          <br />
          <span className='orderpage-info-element-data-address'>{`الرمز البريدي: ${buyer.address.postal}`}</span>
        </div>
      </div>
      <div className='orderpage-section'>
        <h3 className='form-title'>{'معلومات الدفع'}</h3>
        <form className='form' onSubmit={handleSubmit(submit)}>
          <label className='form-control-label'>{'طريقة الدفع'}</label>
          <select
            name='paymentMethod'
            className='form-control'
            defaultValue='الرجاء اختيار إحدى الطرق'
            ref={register({
              required: 'يجب اختيار طريقة دفع',
              validate: (value) => value !== 'الرجاء اختيار إحدى الطرق',
            })}
          >
            <option disabled>{'الرجاء اختيار إحدى الطرق'}</option>
            <option value='paypal'>PayPal</option>
          </select>
          {errors.paymentMethod && (
            <span className='form-error-message'>
              {errors.paymentMethod.message}
            </span>
          )}
          {watch('paymentMethod') === 'paypal' && (
            <>
              <label className='form-control-label'>{'حساب Paypal'}</label>
              <input
                name='paymentAccount'
                className='form-control ltr'
                type='email'
                ref={register({
                  required: 'الرجاء إدخال حساب Paypal',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'يجب إدخال بريد إلكتروني صالح',
                  },
                })}
              />
              {errors.paymentAccount && (
                <span className='form-error-message'>
                  {errors.paymentAccount.message}
                </span>
              )}
            </>
          )}
          {isPosting ? (
            <img
              className='form-control form-loading-spinner'
              src={loadingSpinner}
              alt='loading'
            />
          ) : (
            <input
              className='form-control form-control-submit'
              type='submit'
              value='تأكيد الطلب'
            />
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
});
export default connect(mapStateToProps, null)(Order);
