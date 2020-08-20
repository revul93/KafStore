import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo36x36.png';

const Header = () => {
  return (
    <Link class='header-link' to='/'>
      <img className='header-item' src={logo} alt='أيقونة الموقع' />
      <span className='header-item'>مــتـجر كـــاف</span>
    </Link>
  );
};

export default Header;
