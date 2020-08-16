const Book = require('../../models/Book');
const strings = require('../../static/strings');

const addBook = async (req, res) => {
  try {
    // try to find book by isbn
    let book = await Book.findOne({ isbn: req.body.isbn });

    // if no book found create one
    if (!book) {
      book = new Book();
      book.isbn = req.body.isbn;
    }

    // add book general data
    book.title = req.body.title;
    book.author = req.body.author;
    book.section = req.body.section;
    book.subsection = req.body.subsection;
    book.coverImage = req.body.coverImage;
    book.description = req.body.description;
    book.publisher = req.body.publisher;
    book.publicationYear = req.body.publicationYear;
    book.language = req.body.language;
    book.translated = req.body.translated;
    book.translator = req.body.translator;

    // create seller object
    const copy = {
      seller: req.user.id,
      price: req.body.price,
      condition: req.body.condition,
      images: req.body.images.split(','),
    };

    // check if seller already exist
    let copyIndex =
      !book.copy || book.copy.length == 0
        ? -1
        : book.copy.findIndex(
            (elem) => elem._id.toString() == req.body.copy_id,
          );

    if (copyIndex >= 0) {
      book.copy[copyIndex] = copy;
    }
    // if seller not exist, push the seller object
    else {
      book.copy.push(copy);
    }

    // save book
    await book.save();
    return res.json(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};

module.exports = addBook;
