// modules
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// helpers
import getSections from './utils/getSections';
import store from './redux/store';

// components
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Public/Home';
import AboutUs from './components/Public/AboutUs';
import Policy from './components/Public/Policy.js';
import Login from './components/Login';
import Register from './components/Register';
import UserBooks from './components/UserBooks';
import AddBook from './components/AddBook';
import Book from './components/Book';
import Order from './components/Order';
import GetBooks from './components/SubComponents/GetBooks';
import PurchaseOrders from './components/PurchaseOrders';
import PaymentOrders from './components/PaymentOrders';

// static
import './stylesheet/App.css';
import loadingSpinner from './img/ball-spinner.gif';

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
    return (
      <img src={loadingSpinner} alt='loading' className='loading-full-page' />
    );
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
            <Route exact path='/aboutus' component={AboutUs} />
            <Route exact path='/policy' component={Policy} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
