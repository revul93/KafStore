const mongoose = require('mongoose');
const Book = require('../../models/Book');

module.exports = async (query) => {
  if (mongoose.Types.ObjectId.isValid(query)) {
    return await Book.findOne({ _id: query });
  } else if (query.length == 10 || query.length == 13) {
    return await Book.findOne({ isbn: query });
  } else {
    return await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { section: { $regex: query, $options: 'i' } },
        { subsection: { $regex: query, $options: 'i' } },
      ],
    });
  }
};
