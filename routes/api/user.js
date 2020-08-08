const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/userAuth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const router = express.Router();

// @route       POST api/user
// @desc        create new user
// @access      Public
router.post(
  '/',
  [
    check('name', 'لا يمكن أن يكون حقل الاسم فارغا').not().isEmpty(),
    check('email', 'يرجى إدخال بريد إلكتروني صالح')
      .isEmail()
      .normalizeEmail()
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          return Promise.reject('البريد الإلكتروني مسجل مسبقا');
        }
      }),
    check(
      'password',
      'يجب أن تكون كلمة السر مكونة من ست خانات على الأقل'
    ).isLength({
      min: 6,
    }),
    check('passwordConfirmation').custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        return Promise.reject('كلمتا السر غير متطابقتان');
      } else return Promise.resolve();
    }),
    check('phone', 'الرجاء إدخال رقم هاتف صالح').isMobilePhone(),
    check('country', 'يرحى إدخال اسم الدولة').not().isEmpty(),
    check('city', 'يرجى إدخال اسم المدينة').not().isEmpty(),
    check('district', 'يرجى إدخال اسم الحي').not().isEmpty(),
    check('street', 'يرجى إدخال اسم الشارع').not().isEmpty(),
    check('describtion', 'يرجى إدخال وصف العنوان').not().isEmpty(),
    check('postal', 'يرجى إدخال رمز بريدي صالح')
      .if(check('postal').exists())
      .isLength({
        max: 5,
        min: 5,
      }),
  ],
  async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const encPassword = await bcrypt.hash(req.body.password, salt);

      // construct user model
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encPassword,
        phone: req.body.phone,
        profilepic: req.body.profilepic,
        address: {
          country: req.body.country,
          city: req.body.city,
          district: req.body.district,
          street: req.body.street,
          describtion: req.body.describtion,
          postal: req.body.postal,
        },
        isAdmin: req.body.isAdmin || false,
      });

      await user.save();

      // create payload to associate it with token
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };

      // generate token and return it back
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          return res.json(token);
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error!');
    }
  }
);

// @route       PUT api/user/:user_id
// @desc        Edit user info, either by the user itself or by admin
// @access      Private
router.put('/:user_id', auth, async (req, res) => {});

// @route       GET api/user/
// @desc        get all user info, access for admin only
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send('Not authorized');
    }

    // get users from db
    const users = await User.find();
    if (!users) {
      return res.status(400).send('There is no registered user!');
    }

    return res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error!');
  }
});

// @route       GET api/user/:user_id
// @desc        get user info by id
// @access      Public
router.get('/:user_id', async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).send("User doesn't exist");
    }
    return res.status(500).send('Server Error!');
  }
});

// @route       DELETE api/user/:user_id
// @desc        delete user, either by the user itself or by admin
// @access      Private
router.delete('/:user_id', auth, async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.params.user_id);

    // check for authorization
    console.log(req.user.id), console.log(user.id);
    console.log(req.user.isAdmin);
    if (req.user.id != user.id.toString() && !req.user.isAdmin) {
      return res.status(401).send('Not authorized');
    }

    // check if user existed
    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    await user.remove();

    return res.send(`User ${user.name} deleted successfully!`);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).send("User doesn't exist");
    }
    return res.status(500).send('Server Error!');
  }
});

module.exports = router;
