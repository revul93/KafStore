const strings = require('../../static/strings');
const queryBook = require('./queryBook');
const s3Delete = require('../s3Delete');

module.exports = async (book_id, copy_id, user_id) => {
  const book = await queryBook(book_id);
  if (!book) {
    return strings.FAIL;
  }
  const copy = await book.copy.find((c) => c._id == copy_id);
  if (!copy || copy.seller._id.toString() !== user_id) {
    return strings.FAIL;
  }

  copy.images.forEach((url) => s3Delete(url));
  book.copy = await book.copy.filter((copy) => {
    copy._id !== copy_id;
  });
  await book.save();

  return strings.SUCCESS;
};
