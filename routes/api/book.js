// modules
const express = require('express');
const strings = require('../../static/strings');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateBookInfo = require('../../middleware/validateBookInfo');
const validateObjectId = require('../../middleware/validateObjectId');

// models
const Book = require('../../models/Book');
const User = require('../../models/User');

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
router.post('/', [auth, validateBookInfo(), validate], async (req, res) => {
  try {
    // construt book
    const book = new Book({
      // book general info
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      division: req.body.division,
      subdivision: req.body.subdivision,
      coverImage: req.body.coverImage,
      description: req.body.description || '',
      publisher: req.body.publisher || '',
      publicationYear: req.body.publicationYear || '',
      language: req.body.language || '',
      translated: req.body.translated,
      translator: req.body.translator || '',

      // seller info
      seller: {
        user: req.user.id,
        price: req.body.price,
        condition: req.body.condition,
        images: req.body.images.split(','),
      },
    });

    // save book
    await book.save();
    return res.json(book);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        get book info
// @route       GET api/book/:book_id
// @access      Public
router.get('/:book_id', async (req, res) => {});

// @desc        edit book info
// @route       PUT api/book/
// @access      Private
router.put('/', [auth], async (req, res) => {});

// @desc        remove a seller of a book
// @route       PUT api/book/
// @access      Private
router.put('/', [auth], async (req, res) => {});

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
