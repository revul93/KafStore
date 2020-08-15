// modules
const express = require('express');
const strings = require('../../static/strings');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateObjectId = require('../../middleware/validateObjectId');
const validateUserReg = require('../../middleware/validateUserReg');
const validateUserLogin = require('../../middleware/validateUserLogin');
const validateUserInfoEdit = require('../../middleware/validateUserInfoEdit');

// models
const User = require('../../models/User');

// router instance
const router = express.Router();

/*
 * Routes for /api/user
 * Registration
 * Login
 * Users report
 * User profile
 * User Info edit
 * User records update
 * User deletion
 */

// @desc        register new user
// @route       POST api/user
// @access      Public
router.post('/register', [validateUserReg(), validate], async (req, res) => {
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
      gender: req.body.gender,
      address: {
        country: req.body.country,
        city: req.body.city,
        district: req.body.district,
        street: req.body.street,
        description: req.body.description,
        postal: req.body.postal,
      },
    });

    // save user in db
    await user.save();

    return res.send(strings.USER_CREATED_SUCCESSFULLY.AR);
  } catch (error) {
    console.error(error);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        login a user
// @route       POST api/user/login
// @access      Public
router.post('/login', [validateUserLogin(), validate], async (req, res) => {
  try {
    // get user from db
    const user = await User.findOne({ email: req.body.email });

    // if user not exist or password is incorrect response with error
    if (!user || !bcrypt.compare(req.body.password, user.password)) {
      return res.status(400).json(strings.LOGIN_FAILED.AR);
    }

    // else confirm login and send back jwt token
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
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        get all user info
// @route       GET api/user/
// @access      Private, admin only
router.get('/all', auth, async (req, res) => {
  try {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }

    // get users from db
    const users = await User.find().select(
      '-password -viewed -searches -complaint -review'
    );

    // if no user registered...
    if (!users) {
      return res.send(strings.NO_USERS.AR);
    }

    // else return all users
    return res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        get user own info
// @route       GET api/user/me
// @access      Public
router.get('/me', auth, async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.user.id).select(
      '-password -isAdmin -viewed -searches -complaint -review'
    );

    // if no user found
    if (!user) {
      return res.status(400).send(strings.NO_USER.EN);
    }

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        get user info by id
// @route       GET api/user/:user_id
// @access      Public
router.get(
  '/:user_id',
  [validateObjectId('user_id', strings.NO_USER.EN), validate],
  async (req, res) => {
    try {
      // get user from db
      const user = await User.findById(req.params.user_id).select(
        'id name email review profilepic'
      );

      // if no user found
      if (!user) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      return res.json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

// @desc        Edit user info
// @route       PUT api/user/
// @access      Private
router.put(
  '/editmyinfo',
  [auth, validateUserInfoEdit(), validate],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(400).send(strings.NO_USER.AR);
      }

      user.name = req.body.name;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const encPassword = await bcrypt.hash(req.body.password, salt);
        user.password = encPassword;
      }
      user.phone = req.body.phone;
      user.gender = req.body.gender;
      user.profilepic = req.body.profilepic;
      user.address.country = req.body.country;
      user.address.city = req.body.city;
      user.address.district = req.body.district;
      user.address.street = req.body.street;
      user.address.description = req.body.description;
      user.address.postal = req.body.postal;

      await user.save();
      return res.send(strings.SUCCESSFUL.AR);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

// @desc        Update records related to searches and views
// @route       PUT api/user/updaterecords
// @access      Private
router.put('/updaterecords', [auth], async (req, res) => {
  try {
    // get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send(strings.NO_USER.AR);
    }

    // get name of record to update
    const record = req.body.search ? 'search' : req.body.view ? 'view' : null;
    if (!record) {
      return res.status(400).send(strings.MISSING_INFO.EN);
    }

    // maximum record length to keep is 100
    if (user[record].length > 100) {
      user[record].pop();
    }
    // add record
    user[record].unshift(req.body[record]);

    // save changes and inform+
    await user.save();
    return res.send(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        delete user, either by the user itself or by admin
// @route       DELETE api/user/
// @access      Private same user or admin
router.delete(
  '/',
  [auth, validateObjectId('user_id', strings.NO_USER.EN), validate],
  async (req, res) => {
    try {
      // get user from db
      const user = await User.findById(req.body.user_id);

      // check if user existed
      if (!user) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      // check for authorization
      if (req.user.id != user.id.toString() && !req.user.isAdmin) {
        return res.status(401).send(strings.NOT_AUTHORIZED.EN);
      }

      // TODO: delete any books or reviews created by the user

      // remove the user
      await user.remove();

      // inform
      return res.send(strings.SUCCESSFUL.EN);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

module.exports = router;
