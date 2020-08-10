const { body } = require('express-validator');

const validateUserLogin = () => {
  return [
    body('email', 'الرجاء إدخال البريد الإلكتروني').isEmail().normalizeEmail(),
    body('password', 'الرجاء إدخال كلمة السر').not().isEmpty(),
  ];
};

module.exports = validateUserLogin;
