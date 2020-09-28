const Book = require('../../models/Book');
const mongoose = require('mongoose');

module.exports = async (user_id) => {
  const books = await Book.find({
    'copy.seller': mongoose.Types.ObjectId(user_id),
    'copy.isSold': false,
  });

  if (!books || books.length == 0) {
    return null;
  }
  books.forEach(
    async (book) =>
      (book.copy = await book.copy.filter(
        (copy) => copy.seller.toString() === user_id.toString()
      ))
  );

  return books;
};
