// modules
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// helpers
import getSections from './utils/getSections';
import store from './redux/store';

// components
// --> Layout
import Header from './components/LayoutComponenets/Header';
import Navbar from './components/LayoutComponenets/Navbar';
import Footer from './components/LayoutComponenets/Footer';

// --> Public
import Home from './components/PublicComponenets/Home';
import AboutUs from './components/PublicComponenets/AboutUs';
import Policy from './components/PublicComponenets/Policy.js';

// --> User
import User from './components/UserComponents/User';
import Login from './components/UserComponents/Login';
import Register from './components/UserComponents/Register';

// --> Book
import Book from './components/BookComponents/Book';
import UserBooks from './components/BookComponents/UserBooks';
import AddBook from './components/BookComponents/AddBook';

// --> Order
import Order from './components/OrderComponents/Order';
import PurchaseOrders from './components/OrderComponents/PurchaseOrders';
import PaymentOrders from './components/OrderComponents/PaymentOrders';

import GetBooksContainer from './components/SubComponents/GetBooksContainer';

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
            <Route exact path='/profile/:user_id' component={User} />
            <Route exact path='/user/books' component={UserBooks} />
            <Route exact path='/user/books/addbook' component={AddBook} />
            <Route exact path='/section/:query' component={GetBooksContainer} />
            <Route exact path='/search/:query/' component={GetBooksContainer} />
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
