import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheet/dropdown.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li className='navbar-list-item dropdown'>
          <Link className='navbar-list-item-link' to='#!'>
            أقسام الموقع
          </Link>
          <ul class='dropdown-content'>
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
    </nav>
  );
};

export default Navbar;
