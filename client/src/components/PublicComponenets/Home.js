// modules
import React, { Fragment } from 'react';
import BooksContainer from '../SubComponents/BooksContainer';
import Search from './Search';

// static
import banner from '../../img/banner.jpg';
import '../../stylesheet/Home.css';

const Home = () => {
  return (
    <Fragment>
      <div className='banner-container'>
        <h1 className='banner-text'>
          {
            'مارس شغفك بالقراءة دون توقف وقم ببيع كتبك المستعملة وشراء غيرها بشكل دوري ووفر الكثير!'
          }
        </h1>
        <img
          src={banner}
          alt='قم ببيع وشراء الكتب المستعملة واستمتع بالتوفير'
          className='banner-image'
        />
      </div>
      <Search />
      <BooksContainer title='أحدث الكتب المضافة' query='_latest' />
      <hr />
      <BooksContainer title='مقترحاتنا لك' query='_recom' />
    </Fragment>
  );
};

export default Home;
