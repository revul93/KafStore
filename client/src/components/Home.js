import React, { Fragment } from 'react';
import BooksContainer from './BooksContainer';

import '../stylesheet/search-input.css';

const Home = () => {
  return (
    <Fragment>
      <input className='search__input' type='text' placeholder='ابحث عن كتاب' />
      <div className='container'>
        <BooksContainer title='أحدث الكتب المضافة' />
        <hr />
        <BooksContainer title='الكتب الأكثر بخثا' />
        <hr />
        <BooksContainer title='مقترحاتنا لك' />
      </div>
    </Fragment>
  );
};

export default Home;
