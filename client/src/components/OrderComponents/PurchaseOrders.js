// modules
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';

// helpers
import fetchPurchaseOrders from '../../utils/fetchPurchaseOrders';

// static
import '../../stylesheet/Order.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const PurchaseOrders = (props) => {
  const { token, isLoggedIn } = props;

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState();
  const [error, setError] = useState();
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
      fetchPurchaseOrders(token).then((data) => {
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

  return (
    <div class='orderpage-container'>
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
              <span>{`البائع: ${order.seller.name}`}</span>
              <span>{`الكتاب: ${order.item.book.title}، ${order.item.book.author}`}</span>
              <span>{`المبلغ: ${order.amount} ل.س.`}</span>
              <span>{`طريقة الدفع: ${order.paymentMethod}`}</span>
              <span>{`تاريخ الشراء: ${new Date(
                order.date
              ).toLocaleDateString()}`}</span>
            </span>
            <span className='order-row-info'>{order.status}</span>
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
