const { body } = require('express-validator');
const strings = require('../static/strings');

const validateUserLogin = () => {
  return [
    body('email', strings.EMAIL_NOT_VALID.AR).isEmail().normalizeEmail(),
    body('password', strings.PASSWORD_IS_EMPTY.AR).not().isEmpty(),
  ];
};

module.exports = validateUserLogin;
