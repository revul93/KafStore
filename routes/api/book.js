// modules
const express = require('express');
const strings = require('../../static/strings');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateBookInfo = require('../../middleware/validateBookInfo');
const validateObjectId = require('../../middleware/validateObjectId');

// actions
const addBook = require('../../actions/book/addBook');
const queryBook = require('../../actions/book/queryBook');
const getallUserCopies = require('../../actions/book/getAllUserCopies');
const removeUserCopy = require('../../actions/book/removeUserCopy');
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
router.post('/', [auth, validateBookInfo(), validate], (req, res) => {
  addBook(req, res);
});

// @desc        search a book by query (id, isbn, title, author, section, subsection)
// @route       GET api/book/:query
// @access      Public
// querying book by id or isbn will return one book with the users who sell this book
// querying book by keyword will return all the books that match search keyword
//   with users who sell these books
router.get('/:query', (req, res) => {
  queryBook(req, res);
});

// @desc        get all books of user
// @route       GET api/book/user/:user_id
// @access      Public
router.get(
  '/user/:user_id',
  [validateObjectId('user_id', strings.NO_USER.AR)],
  (req, res) => {
    getallUserCopies(req, res);
  },
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
  (req, res) => {
    removeUserCopy(req, res);
  },
);

// @desc        remove all copies of book owned by user
// @route       PUT api/book/user/
// @access      Private, admin only
router.put(
  '/user',
  [auth, validateObjectId('user_id', strings.NO_USER.AR), validate],
  (req, res) => {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }
    removeAllUserCopies(req, res);
  },
);

// @desc        delete a book
// @route       DELETE api/book/
// @access      Private, admin only
router.delete(
  '/',
  [auth, validateObjectId('book_id', strings.NO_BOOK.EN), validate],
  (req, res) => {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }
    removeBook(req, res);
  },
);

module.exports = router;
