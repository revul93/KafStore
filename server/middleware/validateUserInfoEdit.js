const { body } = require('express-validator');
const strings = require('../static/strings');

const validateUserInfoEdit = () => {
  return [
    // name must not be empty
    body('name', strings.NAME_IS_EMPTY.AR).not().isEmpty(),

    // password must be at least 6 characters long
    body('password', strings.PASSWORD_COMPLEXITY.AR)
      .if(body('password').not().isEmpty())
      .isLength({
        min: 6,
      }),

    // password confirmation must match password
    body('passwordConfirmation').custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        return Promise.reject(strings.PASSWORD_MISMATCH.AR);
      } else return Promise.resolve();
    }),
    // phone must exist and is valid
    body('phone', strings.PHONE_NOT_VALID.AR).isMobilePhone(),

    // gender must be chosen
    body('gender', strings.GENDER_REQUIRED.AR).not().isEmpty(),

    // country must exist
    body('country', strings.COUNTRY_IS_EMPTY.AR).not().isEmpty(),

    // city must exist
    body('city', strings.CITY_IS_EMPTY.AR).not().isEmpty(),

    // district must exist
    body('district', strings.DISTRICT_IS_EMPTY.AR).not().isEmpty(),

    // street must exist
    body('street', strings.STREET_IS_EMPTY.AR).not().isEmpty(),

    // postal code is optional, but if provided must be valid
    body('postal', strings.POSTAL_INVALID.AR)
      .if(body('postal').exists())
      .isLength({
        max: 5,
        min: 5,
      }),
  ];
};

module.exports = validateUserInfoEdit;
