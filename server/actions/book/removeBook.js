const queryBook = require('./queryBook');
const strings = require('../../static/strings');

const removeBook = async (book_id) => {
  const book = await queryBook(book_id);
  if (!book) {
    return strings.FAIL;
  }
  await book.remove();
  return strings.SUCCESS;
};

module.exports = removeBook;
