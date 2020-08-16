const Book = require('../../models/Book');
const strings = require('../../static/strings');

const removeBook = async (req, res) => {
  try {
    // find and remove the book
    const book = await Book.findById(req.body.book_id);

    if (!book) {
      return res.status(400).send(strings.NO_BOOK.EN);
    }

    await book.remove();

    return res.send(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};

module.exports = removeBook;
