const Book = require('../../models/Book');
const strings = require('../../static/strings');

const removeAllUserCopies = async (req, res) => {
  try {
    // get books that user has a copy of them
    const books = await Book.find({
      'copy.seller': mongoose.Types.ObjectId(req.body.user_id),
    });

    // if no result found
    if (!books || books.length == 0) {
      return res.status(400).send(strings.NO_BOOK.AR);
    }

    // remove user copies
    for (let book of books) {
      book.copy = book.copy.filter((elem) => elem.seller != req.body.user_id);
      await book.save();
    }

    return res.send(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};

module.exports = removeAllUserCopies;
