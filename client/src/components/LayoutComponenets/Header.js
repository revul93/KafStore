// modules
import React from 'react';
import { Link } from 'react-router-dom';

// static
import '../../stylesheet/Header.css';
import logo from '../../img/logo36x36.png';

const Header = () => {
  return (
    <Link className='header' to='/'>
      <img className='header-item header-img' src={logo} alt='أيقونة الموقع' />
      <span className='header-item header-text'>{'مــتـجر كـــاف'}</span>
    </Link>
  );
};

export default Header;
