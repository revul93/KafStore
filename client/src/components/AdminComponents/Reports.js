// modules
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// static
import '../../stylesheet/AdminReports.css';
import loadingSpinner from '../../img/loading-spinner.gif';

const Reports = (props) => {
  const [pageLoading, setPageLoading] = useState(true);
  const { isLoggedIn, token, isAdmin } = props;
  const [state, setState] = useState({
    numAddedBooks: 0,
    numSoldbooks: 0,
    sections: {},
    numUsers: 0,
    userDistribution: {},
    numOrders: 0,
    totalOrderAmounts: 0,
  });
  const [view, setView] = useState('numAddedBooks');
  const buttons = [
    { text: 'عدد الكتب المضافة: ', value: 'numAddedBooks' },
    { text: 'عدد الكتب المباعة: ', value: 'numSoldbooks' },
    { text: 'الأقسام: ', value: 'sections' },
    { text: 'عدد المستخدمين: ', value: 'numUsers' },
    { text: 'توزع المستخدمين جغرافيا: ', value: 'userDistribution' },
    { text: 'عدد الطلبات: ', value: 'numOrders' },
    { text: 'إجمالي المبيعات: ', value: 'totalOrderAmounts' },
  ];
  useEffect(() => {
    setPageLoading(true);
    const getData = async () => {
      let users,
        books,
        orders = null;
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      };
      try {
        users = (await axios.get('/api/user/all', config)).data;
        books = (await axios.get('/api/book?query=_all', config)).data;
        orders = (await axios.get('/api/order/all', config)).data;
        setState({
          numAddedBooks: `${books.length} كتاب`,
          numSoldbooks: `${books.reduce((result, book) => {
            return (
              result +
              book.copy.reduce(
                (result, copy) => (copy.isSold ? result + 1 : result),
                0
              )
            );
          }, 0)} كتب`,
          sections: books.reduce((result, book) => {
            if (result[book.section]) {
              result[book.section]++;
              return result;
            }
            result[book.section] = 1;
            return result;
          }, {}),
          numUsers: `${users.length} مستخدمين`,
          userDistribution: users.reduce((result, user) => {
            if (result[user.address.country]) {
              result[user.address.country]++;
              return result;
            }
            result[user.address.country] = 1;
            return result;
          }, {}),
          numOrders: `${orders.length} طلبات`,
          totalOrderAmounts: `${orders.reduce(
            (result, order) => result + order.amount,
            0
          )} ل.س.`,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    getData().then(() => {
      setPageLoading(false);
    });
  }, [token]);

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

  return (
    <>
      <h2 className='reports-title'>
        {'التقارير'}
        <br />
        {'اختر تقريرا لعرضه'}
      </h2>
      <div className='reports-container'>
        <div className='reports-buttons'>
          {buttons.map((button) => (
            <button
              onClick={(event) => {
                event.preventDefault();
                setView(button.value);
              }}
              key={button.value}
              className={`reports-button ${
                view === button.value ? 'selected' : ''
              }`}
            >
              {button.text}
            </button>
          ))}
        </div>
        <div className='report-container'>
          {typeof state[view] === 'object' ? (
            <>
              {Object.keys(state[view]).map((key, index) => (
                <div key={index} className='report-info'>
                  {`${key}: ${state[view][key]} ${
                    view === 'sections' ? 'كتب' : 'مستخدم'
                  }`}
                </div>
              ))}
            </>
          ) : (
            <div className='report-info'>{state[view]}</div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  token: state.auth.token,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(Reports);
