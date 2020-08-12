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
 * User deletion
 */

// @desc        register new user
// @route       POST api/user
// @access      Public
router.post('/', [validateUserReg(), validate], async (req, res) => {
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
        description: req.body.description,
        postal: req.body.postal,
      },
    });

    // save user in db
    await user.save();

    return res.send(strings.USER_CREATED_SUCCESSFULLY.EN);
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

// @desc        Edit user info, either by the user itself or by admin
// @route       PUT api/user/
// @access      Private, same user or admin
router.put('/', auth, async (req, res) => {
  // TODO
});

// @desc        get all user info
// @route       GET api/user/
// @access      Private, admin only
router.get('/', auth, async (req, res) => {
  try {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }

    // get users from db
    const users = await User.find().select('-password');

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
        '-password -isAdmin'
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

      // check for authorization
      if (req.user.id != user.id.toString() && !req.user.isAdmin) {
        return res.status(401).send(string.NOT_AUTHORIZED.EN);
      }

      // check if user existed
      if (!user) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      // TODO: delete any books or reviews created by the user

      // remove the user
      await user.remove();

      // inform
      return res.send(strings.SUCCESSFUL.EN);
    } catch (error) {
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

module.exports = router;
