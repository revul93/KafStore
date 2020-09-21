const { body } = require('express-validator');
const strings = require('../static/strings');

const validateOrder = () => {
  return [
    body('seller_id', strings.NO_DATA).not().isEmpty(),
    body('book_id', strings.NO_DATA).not().isEmpty(),
    body('copy_id', strings.NO_DATA).not().isEmpty(),
    body('amount', strings.NO_DATA).not().isEmpty().isNumeric(),
    body('paymentMethod', strings.NO_DATA).not().isEmpty(),
    body('paymentAccount', strings.NO_DATA).isEmail().normalizeEmail(),
  ];
};

module.exports = validateOrder;
