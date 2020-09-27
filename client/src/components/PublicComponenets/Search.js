// modules
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// static
import '../../stylesheet/Search.css';

const Search = () => {
  const [query, setQuery] = useState(false);

  // when query submitted
  if (query) {
    return <Redirect to={`/search/${query}`} />;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setQuery(event.currentTarget.search.value);
      }}
      className='search-form'
    >
      <input
        className='search-input'
        type='text'
        placeholder='ابحث عن كتاب'
        name='search'
      ></input>
      <input type='submit' className='search-submit' value='' />
    </form>
  );
};

export default Search;
