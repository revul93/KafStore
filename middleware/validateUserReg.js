const { body } = require('express-validator');

const validateUserReg = () => {
  return [
    // name must not be empty
    body('name', 'لا يمكن أن يكون حقل الاسم فارغا').not().isEmpty(),

    // email must be valid and not used by another user
    body('email', 'يرجى إدخال بريد إلكتروني صالح')
      .isEmail()
      .normalizeEmail()
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          return Promise.reject('البريد الإلكتروني مسجل مسبقا');
        }
      }),

    // password must be at least 6 characters long
    body(
      'password',
      'يجب أن تكون كلمة السر مكونة من ست خانات على الأقل'
    ).isLength({
      min: 6,
    }),

    // password confirmation must match password
    body('passwordConfirmation').custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        return Promise.reject('كلمتا السر غير متطابقتان');
      } else return Promise.resolve();
    }),

    // phone must exist and is valid
    body('phone', 'الرجاء إدخال رقم هاتف صالح').isMobilePhone(),

    // country must exist
    body('country', 'يرحى إدخال اسم الدولة').not().isEmpty(),

    // city must exist
    body('city', 'يرجى إدخال اسم المدينة').not().isEmpty(),

    // district must exist
    body('district', 'يرجى إدخال اسم الحي').not().isEmpty(),

    // street must exist
    body('street', 'يرجى إدخال اسم الشارع').not().isEmpty(),

    // address describtion is mandatory
    body('describtion', 'يرجى إدخال وصف العنوان').not().isEmpty(),

    // postal code is optional, but if provided must be valid
    body('postal', 'يرجى إدخال رمز بريدي صالح')
      .if(body('postal').exists())
      .isLength({
        max: 5,
        min: 5,
      }),
  ];
};

module.exports = validateUserReg;
