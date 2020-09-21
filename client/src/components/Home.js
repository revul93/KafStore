import React, { Fragment } from 'react';
import BooksContainer from './BooksContainer';
import Search from './Search';

const Home = () => {
  return (
    <Fragment>
      <Search />
      <BooksContainer title='أحدث الكتب المضافة' query='_latest' />
      <hr />
      <BooksContainer title='مقترحاتنا لك' query='_recommended' />
    </Fragment>
  );
};

export default Home;
