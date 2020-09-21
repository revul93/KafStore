import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import getSections from './utils/getSections';
import store from './redux/store';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserBooks from './components/UserBooks';
import AddBook from './components/AddBook';
import Book from './components/Book';
import Order from './components/Order';
import GetBooks from './components/GetBooks';
import PurchaseOrders from './components/PurchaseOrders';
import PaymentOrders from './components/PaymentOrders';

import './App.css';
import loadingSpinner from '../src/img/ball-spinner.gif';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState(null);
  useEffect(() => {
    getSections().then((data, error) => {
      if (error) {
        setLoading(false);
      }
      setSections(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <img src={loadingSpinner} alt='loading' className='page-load' />;
  }

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Navbar sections={sections} />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/user/books' component={UserBooks} />
            <Route exact path='/user/books/addbook' component={AddBook} />
            <Route exact path='/section/:query' component={GetBooks} />
            <Route exact path='/search/:query/' component={GetBooks} />
            <Route exact path='/book/:book_id' component={Book} />
            <Route path='/buy/:book_id/:copy_id' component={Order} />
            <Route exact path='/user/orders' component={PurchaseOrders} />
            <Route exact path='/user/sales' component={PaymentOrders} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
