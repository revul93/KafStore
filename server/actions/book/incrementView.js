const Book = require('../../models/Book');
const strings = require('../../static/strings');

module.exports = async (book_id) => {
  try {
    const book = await Book.findById(book_id);
    book.viewCounter = book.viewCounter + 1;
    book.save();
    return strings.SUCCESS;
  } catch (error) {
    console.error(error.message);
    return strings.FAIL;
  }
};
