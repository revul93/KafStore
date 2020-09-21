import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../stylesheet/search-input.css';

const Search = () => {
  const [query, setQuery] = useState(false);

  if (query) {
    return <Redirect to={`/search/${query}`} />;
  }
  return (
    <form
      onSubmit={(e) => setQuery(e.currentTarget.search.value)}
      className='search__form'
    >
      <input
        className='search__input'
        type='text'
        placeholder='ابحث عن كتاب'
        name='search'
      ></input>
      <input type='submit' className='search__submit' value='' />
    </form>
  );
};

export default Search;
