// modules
const express = require('express');
const strings = require('../../static/strings');
const mongoose = require('mongoose');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateBookInfo = require('../../middleware/validateBookInfo');
const validateObjectId = require('../../middleware/validateObjectId');

// models
const Book = require('../../models/Book');

// router instance
const router = express.Router();

/*
 * Routes for /api/book
 * get book
 * get specific book
 * add book
 * edit book detail
 * remove a seller of a book
 * delete a book
 */

// @desc        add new book
// @route       POST api/book
// @access      Private
// to add new book, send full book information
// to add a copy of existing book send full book information
// to edit existing copy of the book, send full book information + the id of the copy copy_id
router.post('/', [auth, validateBookInfo(), validate], async (req, res) => {
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
            (elem) => elem._id.toString() == req.body.copy_id
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
});

// @desc        search a book by query (id, isbn, title, author, section, subsection)
// @route       GET api/book/:query
// @access      Public
// querying book by id or isbn will return one book with the users who sell this book
// querying book by keyword will return all the books that match search keyword
//   with users who sell these books
router.get('/:query', async (req, res) => {
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
});

// @desc        get all books of user
// @route       GET api/book/user/:user_id
// @access      Public
router.get(
  '/user/:user_id',
  [validateObjectId('user_id', strings.NO_USER.AR)],
  async (req, res) => {
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
        book.copy = book.copy.filter(
          (elem) => elem.seller == req.params.user_id
        );
      }

      // response with result found
      return res.json(books);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

// @desc        remove a copy of a book
// @route       PUT api/book/
// @access      Private
router.put(
  '/',
  [
    auth,
    validateObjectId('book_id', strings.NO_BOOK.AR),
    validateObjectId('copy_id', strings.NO_BOOK.AR),
    validate,
  ],
  async (req, res) => {
    try {
      // get book
      const book = await Book.findById(req.body.book_id);
      if (!book) {
        return res.status(400).send(strings.NO_BOOK.AR);
      }

      // get copy index
      const copyIndex = book.copy.findIndex(
        (elem) => elem._id.toString() == req.body.copy_id
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
  }
);

// @desc        remove all copies of book owned by user
// @route       PUT api/book/user/
// @access      Private, admin only
router.put(
  '/user',
  [auth, validateObjectId('user_id', strings.NO_USER.AR), validate],
  async (req, res) => {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }

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
  }
);

// @desc        delete a book
// @route       DELETE api/book/
// @access      Private, admin only
router.delete(
  '/',
  [auth, validateObjectId('book_id', strings.NO_BOOK.EN), validate],
  async (req, res) => {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }

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
  }
);

module.exports = router;
