import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './redux/store';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import MyBooks from './components/MyBooks';
import AddBook from './components/AddBook';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/user/books' component={MyBooks} />
          <Route exact path='/user/books/addbook' component={AddBook} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
