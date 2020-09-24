const { body } = require('express-validator');
const strings = require('../static/strings');

const validateBookInfo = () => {
  return [
    body('title', strings.BOOK_TITLE.AR).not().isEmpty(),
    body('author', strings.BOOK_AUTHOR.Ar).not().isEmpty(),
    body('isbn', strings.BOOK_ISBN.AR)
      .isNumeric()
      .custom((value) => {
        if (value.length == 10 || value.length == 13) {
          return Promise.resolve();
        } else return Promise.reject();
      }),
    body('section', strings.BOOK_SECTION.AR).not().isEmpty(),
    body('coverImage', strings.BOOK_COVERIMAGE.AR).not().isEmpty(),
    body('price', strings.BOOK_PRICE.AR)
      .isNumeric()
      .custom((value) => {
        if (value <= 0) {
          return Promise.reject();
        } else return Promise.resolve();
      }),
    body('condition', strings.BOOK_CONDITION.AR).not().isEmpty(),
    body('images', strings.BOOK_IMAGES.AR).custom((value) => {
      let len = value.split(',').length;
      if (len >= 3 && len < 10) {
        return Promise.resolve();
      } else return Promise.reject();
    }),
  ];
};

module.exports = validateBookInfo;
