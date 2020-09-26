// modules
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import axios from 'axios';

// helpers
import fetchPaymentOrders from '../../utils/fetchPaymentOrders';

// static
import '../../stylesheet/Order.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const PurchaseOrders = (props) => {
  const { token, isLoggedIn } = props;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!isLoggedIn) {
      swal({
        icon: 'warning',
        text: 'يتوجيب عليك تسجيل الدخول أولا',
        buttons: 'موافق',
      }).then(() => {
        setLoading(false);
      });
    } else {
      fetchPaymentOrders(token).then((data) => {
        if (!data) {
          setError('حدث خطأ أثناء التحميل، يرجى المحاولة لاحقا');
          setLoading(false);
        } else {
          setOrders(data);
          setLoading(false);
        }
      });
    }
  }, [isLoggedIn, token]);

  if (loading)
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (error) {
    return <h3 className='orderpage-title'>{error}</h3>;
  }

  if (!orders || orders.length === 0) {
    return <h3 className='no-info'>{'لا يوجد لديك طلبات شراء'}</h3>;
  }

  const submit = async (order_id) => {
    try {
      await axios.put(
        '/api/order',
        { order_id },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchPaymentOrders(token).then((data) => {
        if (!data) {
          setError('حدث خطأ أثناء التحميل، يرجى المحاولة لاحقا');
          setLoading(false);
        } else {
          setOrders(data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
      swal({
        title: 'خطأ في الخادم',
        icon: 'error',
      });
    }
  };

  return (
    <div className='orderpage-container'>
      <h3 className='orderpage-title'>{'مشترياتي'}</h3>
      <div className='myorders-container'>
        <div className='order-row order-row-header'>
          <span className='order-row-info-header'>{'رقم الطلب'}</span>
          <span className='order-row-info-header'>{'تفاصيل الطلب'}</span>
          <span className='order-row-info-header'>{'حالة الطلب'}</span>
        </div>
        {orders.map((order, index) => (
          <div key={index} className='order-row'>
            <span className='order-row-info'>
              {order._id.slice(order._id.length - 10)}
            </span>
            <span className='order-row-info'>
              <span>{`المشتري: ${order.buyer.name}`}</span>
              <span>{`الكتاب: ${order.item.book.title}، ${order.item.book.author}`}</span>
              <span>{`المبلغ: ${order.amount} ل.س.`}</span>
              <span>{`طريقة الدفع: ${order.paymentMethod}`}</span>
              <span>{`تاريخ البيع: ${new Date(
                order.date
              ).toLocaleDateString()}`}</span>
            </span>
            <span className='order-row-info'>
              <span>{order.status}</span>
              {order.status === 'في الانتظار' && (
                <form
                  style={{ display: 'flex', flexDirection: 'column' }}
                  onSubmit={handleSubmit(() => submit(order._id))}
                >
                  <label className='form-control'>
                    <input
                      name={`shippedCheckbox-${order._id}`}
                      ref={register()}
                      type='checkbox'
                    />
                    {'تم الشحن ؟'}
                  </label>
                  <input
                    className='form-control form-control-submit'
                    style={{
                      width: 'auto',
                    }}
                    type='submit'
                    value='حفظ'
                  />
                </form>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
});
export default connect(mapStateToProps, null)(PurchaseOrders);
