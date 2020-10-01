// modules
import React from 'react';
import { Link } from 'react-router-dom';

// static
import '../../stylesheet/Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-element'>
        <Link className='footer-link' to='/aboutus'>
          {'من نحن'}
        </Link>
        {' | '}
        <Link className='footer-link' to='/policy'>
          {'سياسة الموقع'}
        </Link>
        {' | '}
        <Link className='footer-link' to='/disclaimer'>
          {'إخلاء مسؤولية'}
        </Link>
      </div>
      <div className='footer-element'></div>
      <span>{`جميع الحقوق محفوظة`} &copy; 2020</span>
    </footer>
  );
};

export default Footer;
