const queryBook = require('./queryBook');
const strings = require('../../static/strings');
const s3Delete = require('../s3Delete');

const removeBook = async (book_id) => {
  const book = await queryBook(book_id);
  if (!book) {
    return strings.FAIL;
  }

  if (book.coverImage) s3Delete(book.coverImage);
  if (book.copy && book.copy.length > 0) {
    book.copy.forEach((copy) => {
      copy.images.forEach((image) => s3Delete(image));
    });
  }

  await book.remove();
  return strings.SUCCESS;
};

module.exports = removeBook;
