const strings = require('../../static/strings');
const queryBook = require('./queryBook');

module.exports = async (book_id, copy_id, user_id) => {
  const book = await queryBook(book_id);
  if (!book) {
    return strings.FAIL;
  }
  const copy = await book.copy.find((c) => c._id == copy_id);
  if (!copy || copy.seller.toString() == user_id) {
    return strings.FAIL;
  }

  book.copy = await book.copy.filter((copy) => {
    copy._id == copy_id;
  });
  await book.save();

  return strings.SUCCESS;
};
