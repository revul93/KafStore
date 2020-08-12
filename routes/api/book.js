// modules
const express = require('express');
const strings = require('../../static/strings');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
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
router.delete('/', [auth], async (req, res) => {});
