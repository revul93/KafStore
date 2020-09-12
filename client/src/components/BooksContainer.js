import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import cover from '../img/book-cover.jpg';

const BooksContainer = (props) => (
  <Fragment>
    <h3 className='books-container-title'>{props.title}</h3>
    <div className='books-container'>
      <div className='book'>
        <Link className='book-link' to='!#'>
          <img className='book-cover' src={cover} alt='' />
          <p className='book-name'>ملك الأدوية</p>
          <p className='book-price'>37.5</p>
        </Link>
        <button className='book-buy-button'>شراء</button>
      </div>
      <div className='book'>
        <img className='book-cover' src={cover} alt='' />
        <p className='book-name'>ملك الأدوية</p>
        <p className='book-price'>37.5</p>
        <button className='book-buy-button'>شراء</button>
      </div>
      <div className='book'>
        <img className='book-cover' src={cover} alt='' />
        <p className='book-name'>ملك الأدوية</p>
        <p className='book-price'>37.5</p>
        <button className='book-buy-button'>شراء</button>
      </div>
      <div className='book'>
        <img className='book-cover' src={cover} alt='' />
        <p className='book-price'>37.5</p>
        <button className='book-buy-button'>شراء</button>
      </div>
    </div>
  </Fragment>
);

export default BooksContainer;
