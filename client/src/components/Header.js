import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../static/img/logo36x36.png';

const Header = () => {
  return (
    <Link className='brand' to='/'>
      <img src={logo} alt='شعار المتجر' />
      <h2>متجر كاف</h2>
    </Link>
  );
};

export default Header;
