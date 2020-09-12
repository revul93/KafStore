// modules
const express = require('express');
const strings = require('../../static/strings');
const handleError = require('../../actions/handleError');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateBookInfo = require('../../middleware/validateBookInfo');
const validateObjectId = require('../../middleware/validateObjectId');

// actions
const upsertBook = require('../../actions/book/upsertBook');
const queryBook = require('../../actions/book/queryBook');
const getUserCopies = require('../../actions/book/getUserCopies');
const removeBookCopy = require('../../actions/book/removeBookCopy');
const removeAllUserCopies = require('../../actions/book/removeAllUserCopies');
const removeBook = require('../../actions/book/removeBook');

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
    const book = await upsertBook(req.user.id, req.body);
    if (!book) {
      return res.status(400).json(strings.FAIL);
    }
    return res.json(book);
  } catch (error) {
    handleError(error);
  }
});

// @desc        search a book by query (id, isbn, title, author, section, subsection)
// @route       GET api/book/:query
// @access      Public
// querying book by id or isbn will return one book with the users who sell this book
// querying book by keyword will return all the books that match search keyword
//   with users who sell these books
router.get('/', async (req, res) => {
  try {
    const book = await queryBook(decodeURI(req.query.query));
    if (!book) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(book);
  } catch (error) {
    handleError(error);
  }
});

// @desc        get all books of user
// @route       GET api/book/user/:user_id
// @access      Public
router.get(
  '/user/:user_id',
  [validateObjectId('user_id', strings.NO_DATA)],
  async (req, res) => {
    try {
      const books = await getUserCopies(req.params.user_id);
      if (!books) {
        return res.status(400).json(strings.NO_DATA);
      }
      return res.json(books);
    } catch (error) {
      handleError(error);
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
    validateObjectId('book_id', strings.NO_DATA),
    validateObjectId('copy_id', strings.NO_DATA),
    validate,
  ],
  async (req, res) => {
    try {
      if (
        (await removeBookCopy(
          req.body.book_id,
          req.body.copy_id,
          req.user.id
        )) == strings.FAIL
      ) {
        return res.status(400).json(strings.FAIL);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
    removeUserCopy(req, res);
  }
);

// @desc        remove all copies of book owned by user
// @route       PUT api/book/user/
// @access      Private, admin only
router.put(
  '/user',
  [auth, validateObjectId('user_id', strings.NO_DATA), validate],
  async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED);
    }
    try {
      if (removeAllUserCopies(req.body.user_id) == strings.FAIL) {
        return res.status(400).json(strings.FAIL);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  }
);

// @desc        delete a book
// @route       DELETE api/book/
// @access      Private, admin only
router.delete(
  '/',
  [auth, validateObjectId('book_id', strings.NO_DATA), validate],
  async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED);
    }
    try {
      if ((await removeBook(req.body.book_id)) == strings.FAIL) {
        return res.status(400).json(strings.NO_DATA);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  }
);

module.exports = router;
