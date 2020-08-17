// modules
const express = require('express');
const strings = require('../../static/strings');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateObjectId = require('../../middleware/validateObjectId');
const validateUserReg = require('../../middleware/validateUserReg');
const validateUserLogin = require('../../middleware/validateUserLogin');
const validateUserInfoEdit = require('../../middleware/validateUserInfoEdit');

// actions
const registerUser = require('../../actions/user/registerUser');
const loginUser = require('../../actions/user/loginUser');
const getUser = require('../../actions/user/getUser');
const removeUser = require('../../actions/user/removeUser');
const updateUser = require('../../actions/user/updateUser');

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
// @route       POST api/user/register
// @access      Public
router.post('/register', [validateUserReg(), validate], async (req, res) => {
  try {
    const user = await registerUser(req.body);
    if (!user) {
      throw new Error();
    }
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
    const token = await loginUser(req.body.email, req.body.password);

    if (!token) {
      return res.status(400).json(strings.LOGIN_FAILED.AR);
    }

    return res.json(token);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        get all user info
// @route       GET api/user/all
// @access      Private, admin only
router.get('/all', auth, async (req, res) => {
  // check if user is not an admin
  if (!req.user.isAdmin) {
    return res.status(401).send(strings.NOT_AUTHORIZED.EN);
  }

  try {
    // get users from db
    const query = 'all';
    const field = '-password -viewed -searches -complaint -review';
    const users = await getUser(query, field);

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
      const query = req.params.user_id;
      const field = 'id name email review profilepic';
      const user = await getUser(query, field);

      // if no user found
      if (!user) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      return res.json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  },
);

// @desc        get user info by id
// @route       GET api/user
// @access      Public
router.get('/', [auth], async (req, res) => {
  try {
    const query = req.user.id;
    const field = '-password -isAdmin';
    const user = await getUser(query, field);

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

// @desc        Edit user info
// @route       PUT api/user/edit
// @access      Private
router.put(
  '/edit',
  [auth, validateUserInfoEdit(), validate],
  async (req, res) => {
    try {
      const done = await updateUser(req.user.id, req.body);
      if (!done) {
        return res.status(400).send(strings.NO_USER.AR);
      }
      return res.send(strings.SUCCESSFUL.AR);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(strings.SERVER_ERROR.EN);
    }
  },
);

// @desc        Update records related to searches and views
// @route       PUT api/user/updaterecords
// @access      Private
router.put('/updaterecords', [auth], async (req, res) => {
  try {
    const done = await updateUser(req.user.id, req.body);
    if (!done) {
      return res.status(400).send(strings.NO_USER.AR);
    }
    return res.send(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

// @desc        delete user, either by the user itself or by admin
// @route       DELETE api/user/
// @access      Private, same user or admin
router.delete('/', [auth], async (req, res) => {
  try {
    let done;
    if (req.user.isAdmin) {
      done = await removeUser(req.body.user_id);
    } else {
      done = await removeUser(req.user.id);
    }

    // check if user existed
    if (!done) {
      return res.status(400).send(strings.NO_USER.EN);
    }
    return res.send(strings.SUCCESSFUL.EN);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
});

module.exports = router;
