import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/auth/actions';

import '../stylesheet/dropdown.css';

const Navbar = (props) => {
  const guestButtons = (
    <ul className='navbar-list'>
      <li className='navbar-list-item'>
        <Link className='navbar-list-item-link' to='/login'>
          تسجيل الدخول
        </Link>
      </li>
      <li className='navbar-list-item'>
        <Link className='navbar-list-item-link' to='/register'>
          مستخدم جديد ؟
        </Link>
      </li>
    </ul>
  );

  const userButtons = (
    <ul className='navbar-list'>
      <li className='navbar-list-item dropdown'>
        <Link className='navbar-list-item-link' to='#!'>
          خدماتي
        </Link>
        <ul className='dropdown-content'>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='#!'>
              معلوماتي
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='#!'>
              طلبات الشراء
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='#!'>
              طلبات البيع
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/user/books'>
              إدارة كتبي
            </Link>
          </li>
        </ul>
      </li>
      <li className='navbar-list-item'>
        <Link className='navbar-list-item-link' onClick={props.logout} to='/'>
          تسجيل خروج
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li className='navbar-list-item dropdown'>
          <Link className='navbar-list-item-link' to='#!'>
            أقسام الموقع
          </Link>
          <ul className='dropdown-content'>
            <li className='navbar-list-item'>
              <Link className='navbar-list-item-link' to='#!'>
                القسم الأول
              </Link>
            </li>
            <li className='navbar-list-item'>
              <Link className='navbar-list-item-link' to='#!'>
                القسم الثاني
              </Link>
            </li>
          </ul>
        </li>
        <li className='navbar-list-item'>
          <Link className='navbar-list-item-link' to='#!'>
            جميع الكتب
          </Link>
        </li>
      </ul>
      {props.isLoggedIn ? userButtons : guestButtons}
    </nav>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: Boolean(state.auth.isLoggedIn),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
