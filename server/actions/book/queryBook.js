const mongoose = require('mongoose');
const Book = require('../../models/Book');
const getRecommendedBooks = require('./getRecommendedBooks');

module.exports = async (query, user_id) => {
  if (mongoose.Types.ObjectId.isValid(query)) {
    return await Book.findOne({ _id: query }).populate('copy.seller', [
      'name',
      '_id',
      'review',
    ]);
  } else if (Number(query) && (query.length == 10 || query.length == 13)) {
    return Book.findOne({ isbn: query }).populate('copy.seller', [
      'name',
      '_id',
      'review',
    ]);
  } else if (query === '_latest') {
    let result = [];
    let i = 0;
    while (result.length < 8) {
      result = await Book.find()
        .sort('-date')
        .limit(8 + i);
      result.forEach(
        (book) => (book.copy = book.copy.filter((copy) => !copy.isSold))
      );
      result = result.filter((book) => book.copy.length > 0);
      i++;
    }
    return result;
  } else if (query === '_recom') {
    result = await getRecommendedBooks(user_id);
  } else if (query === '_all') {
    return await Book.find();
  } else {
    return await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { section: { $regex: query, $options: 'i' } },
      ],
    });
  }

  if (result) {
    return result.filter((book) => book.copy.length > 0);
  }
  return null;
};
