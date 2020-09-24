// modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// helpers
import { logout } from '../../redux/auth/actions';

// static
import '../../stylesheet/Navbar.css';

const Navbar = (props) => {
  const { sections, isLoggedIn, isAdmin, logout } = props;

  // buttons that will be shown to guest
  const guestButtons = (
    <ul className='navbar-list'>
      <li className='navbar-list-item'>
        <Link className='navbar-list-item-link' to='/login'>
          {'تسجيل الدخول'}
        </Link>
      </li>
      <li className='navbar-list-item'>
        <Link className='navbar-list-item-link' to='/register'>
          {'مستخدم جديد؟'}
        </Link>
      </li>
    </ul>
  );

  // buttons that will be shown to logged in user
  const userButtons = (
    <ul className='navbar-list'>
      <li className='navbar-list-item dropdown'>
        <span className='navbar-list-item-link'>{'خدماتي'}</span>
        <ul className='dropdown-content'>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/user/me'>
              {'معلوماتي'}
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/user/orders'>
              {'مشترياتي'}
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/user/sales'>
              {'مبيعاتي'}
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/user/books'>
              {'إدارة كتبي'}
            </Link>
          </li>
        </ul>
      </li>
      <li className='navbar-list-item'>
        <Link className='navbar-list-item-link' onClick={logout} to='/'>
          {'خروج'}
        </Link>
      </li>
    </ul>
  );

  // buttons that will be shown to admin
  const adminButtons = (
    <ul className='navbar-list'>
      <li className='navbar-list-item dropdown'>
        <span className='navbar-list-item-link'>{'إدارة'}</span>
        <ul className='dropdown-content'>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/admin/users'>
              {'إدارة المستخدمين'}
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/admin/books'>
              {'إدارة الكتب'}
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/admin/reports'>
              {'التقارير'}
            </Link>
          </li>
          <li className='navbar-list-item'>
            <Link className='navbar-list-item-link' to='/admin/complaints'>
              {'الشكاوي'}
            </Link>
          </li>
        </ul>
      </li>
      <li className='navbar-list-item'>
        <Link className='navbar-list-item-link' onClick={logout} to='/'>
          {'خروج'}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li className='navbar-list-item dropdown'>
          <span className='navbar-list-item-link navbar-list-item-link-first'>
            {'أقسام الكتب'}
          </span>
          <ul className='dropdown-content'>
            {Object.keys(sections).map((section, index) => (
              <li className='navbar-list-item' key={index}>
                <Link
                  className='navbar-list-item-link navbar-list-item-link-first'
                  to={`/section/${section}`}
                >
                  {section}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className='navbar-list-item'>
          <Link className='navbar-list-item-link' to='/search/_all'>
            {'جميع الكتب'}
          </Link>
        </li>
      </ul>
      {isLoggedIn ? (isAdmin ? adminButtons : userButtons) : guestButtons}
    </nav>
  );
};

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAdmin: Boolean(state.auth.isAdmin),
    isLoggedIn: Boolean(state.auth.isLoggedIn),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
