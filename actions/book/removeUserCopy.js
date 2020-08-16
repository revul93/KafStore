const Book = require('../../models/Book');
const strings = require('../../static/strings');

const removeUserCopy = async (req, res) => {
  try {
    // get book
    const book = await Book.findById(req.body.book_id);
    if (!book) {
      return res.status(400).send(strings.NO_BOOK.AR);
    }

    // get copy index
    const copyIndex = book.copy.findIndex(
      (elem) => elem._id.toString() == req.body.copy_id,
    );

    // if copy not found return with error
    if (copyIndex == -1) {
      return res.status(400).send(strings.NO_BOOK.AR);
    }

    // check if user owns the copy
    if (book.copy[copyIndex].seller.toString() != req.user.id) {
      return res.status(401).send(strings.NOT_AUTHORIZED.AR);
    }

    // remove the copy
    book.copy.splice(copyIndex, 1);
    await book.save();

    return res.send(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};

module.exports = removeUserCopy;
