import React from 'react';
import BooksContainer from './BooksContainer';

const GetBooksContainer = (props) => {
  const { query } = props.match.params;
  let text = '';
  query === '_all'
    ? (text = 'جميع الكتب')
    : (text = `نتيجة البحث عن: ${query}`);
  return (
    <BooksContainer
      title={props.text || text}
      query={props.match.params.query}
    />
  );
};

export default GetBooksContainer;
