import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../static/img/logo36x36.png';

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        <img src={logo} width='30' height='30' alt='' loading='lazy' />
        متجر كاف
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item dropdown'>
            <Link
              className='nav-link dropdown-toggle'
              href='#'
              id='navbarDropdownMenuLink'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              جميع الأقسام
            </Link>
            <div
              className='dropdown-menu'
              aria-labelledby='navbarDropdownMenuLink'
            >
              <Link className='dropdown-item' to='#!'>
                القسم الأول
              </Link>
              <Link className='dropdown-item' to='#!'>
                القسم الثاني
              </Link>
              <Link className='dropdown-item' to='#!'>
                القسم الثالث
              </Link>
            </div>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='#!'>
              جميع الكتب
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              تسجيل الدخول
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'>
              مستخدم جديد ؟
            </Link>
          </li>
        </ul>
        <form className='form-inline' id='search-form'>
          <input
            className='form-control mr-sm-2'
            type='search'
            placeholder='ابحث عن كتاب'
            aria-label='Search'
          />
          <button
            className='btn btn-outline-success my-2 my-sm-0'
            type='submit'
          >
            بحث
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;
