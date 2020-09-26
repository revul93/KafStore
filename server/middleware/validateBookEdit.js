const { body } = require('express-validator');
const strings = require('../static/strings');

module.exports = () => {
  return [
    body('price', strings.BOOK_PRICE.AR)
      .isNumeric()
      .custom((value) => {
        if (value <= 0) {
          return Promise.reject();
        } else return Promise.resolve();
      }),
    body('condition', strings.BOOK_CONDITION.AR).not().isEmpty(),
  ];
};
