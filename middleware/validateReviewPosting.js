const { body } = require('express-validator');

const validateReviewPosting = () => {
  return [
    body('rating')
      .isNumeric()
      .custom((rate) => {
        if (rate < 1 || rate > 5) {
          return Promise.reject('الرجاء إدخال قيمة بين 1 و 5');
        } else return Promise.resolve();
      }),
  ];
};

module.exports = validateReviewPosting;
