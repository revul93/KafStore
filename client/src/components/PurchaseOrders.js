import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import loadingSpinner from '../img/loading-spinner.gif';
import fetchPurchaseOrders from '../utils/fetchPurchaseOrders';

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
    return <img src={loadingSpinner} alt='loading' className='page-load' />;

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }

  if (error) {
    return <h3 className='order-page-header'>{error}</h3>;
  }

  if (!orders || orders.length === 0) {
    return <h3 className='order-page-header'>{'لا يوجد لديك طلبات شراء'}</h3>;
  }
  return <div>{JSON.stringify(orders)}</div>;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
});
export default connect(mapStateToProps, null)(PurchaseOrders);
