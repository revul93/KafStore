import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import './static/stylesheets/App.css';

const App = () => (
  <Fragment>
    <Router>
      <Header />
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </div>
    </Router>
  </Fragment>
);

export default App;
