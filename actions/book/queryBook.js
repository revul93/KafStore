const strings = require('../../static/strings');
const mongoose = require('mongoose');
const Book = require('../../models/Book');

const queryBook = async (req, res) => {
  try {
    const { query } = req.params;
    let result;

    // search the book by ID
    if (mongoose.Types.ObjectId.isValid(query)) {
      result = await Book.find({ _id: query });
    }
    // search the book by ISBN
    else if (query.length == 10 || query.length == 13) {
      result = await Book.find({ isbn: query });
    }
    // search books by title, author, section or subsection
    else {
      result = await Book.find({
        $or: [
          { title: { $regex: decodeURI(query), $options: 'i' } },
          { author: { $regex: decodeURI(query), $options: 'i' } },
          { section: { $regex: decodeURI(query), $options: 'i' } },
          { subsection: { $regex: decodeURI(query), $options: 'i' } },
        ],
      });
    }

    // if no result found
    if (!result) {
      return res.status(400).send(strings.NO_BOOK.AR);
    }

    // response with result found
    return res.json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};

module.exports = queryBook;
