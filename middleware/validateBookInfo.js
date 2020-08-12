const { body } = require('express-validator');

const validateBookInfo = () => {
  return [
    body('title', '').not().isEmpty(),
    body('author', '').not().isEmpty(),
    body('isbn', '').not().isEmpty(),
    body('division', '').not().isEmpty(),
    body('subdivision', '').not().isEmpty(),
    body('coverImage', '').not().isEmpty(),
    body('price', '')
      .isNumeric()
      .custom((value) => {
        if (value <= 0) {
          return Promise.reject();
        } else return Promise.resolve();
      }),
    body('condition', '').not().isEmpty(),
    body('images', '').isLength({
      min: 3,
      max: 10,
    }),
  ];
};

module.exports = validateBookInfo;
