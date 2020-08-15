import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>
        <ul>
          <li className='dropdown'>
            <Link to='/allsections'>أقسام الموقع</Link>
            <div className='dropdown-content'>
              <Link to='/section'>القسم الأول</Link>
              <Link to='/section'>القسم الثاني</Link>
              <Link to='/section'>القسم الثالث</Link>
            </div>
          </li>
          <li>
            <Link to='/allbooks'>جميع الكتب</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <Link to='/login'>تسجيل الدخول</Link>
          </li>
          <li>
            <Link to='/register'>التسجيل</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
