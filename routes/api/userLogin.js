const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const router = express.Router();

// @route       POST api/user/login
// @desc        login a user
// @access      Public
router.post(
  '/',
  [
    check('email', 'الرجاء إدخال البريد الإلكتروني').isEmail().normalizeEmail(),
    check('password', 'الرجاء إدخال كلمة السر').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user || !bcrypt.compare(req.body.password, user.password)) {
        return res
          .status(400)
          .json(
            'فشل تسجيل الدخول، الرجاء التأكد من البريد الالكتروني وكلمة السر'
          );
      }

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
      console.error(error.message);
      res.status(500).send('Server Error!');
    }
  }
);

module.exports = router;
