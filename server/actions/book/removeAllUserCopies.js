const Book = require('../../models/Book');
const strings = require('../../static/strings');
const mongoose = require('mongoose');

const removeAllUserCopies = async (user_id) => {
  const books = await Book.find({
    'copy.seller': mongoose.Types.ObjectId(user_id),
  });

  if (!books || books.length == 0) {
    return strings.FAIL;
  }

  books.forEach(async (book) => {
    book.copy = await book.copy.filter((copy) => copy.seller != user_id);
    await book.save();
  });

  return strings.SUCCESS;
};

module.exports = removeAllUserCopies;
