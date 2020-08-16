const Book = require('../../models/Book');
const strings = require('../../static/strings');
const mongoose = require('mongoose');

const getallUserCopies = async (req, res) => {
  try {
    const books = await Book.find({
      'copy.seller': mongoose.Types.ObjectId(req.params.user_id),
    });

    // if no result found
    if (!books || books.length == 0) {
      return res.status(400).send(strings.NO_BOOK.AR);
    }

    // just send the copies of user
    for (let book of books) {
      book.copy = book.copy.filter((elem) => elem.seller == req.params.user_id);
    }

    // response with result found
    return res.json(books);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};

module.exports = getallUserCopies;
