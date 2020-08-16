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
const getAllUsers = require('../../actions/user/getAllUsers');
const getMe = require('../../actions/user/getMe');
const getUserById = require('../../actions/user/getUserById');
const editUser = require('../../actions/user/editUser');
const updateUserRecords = require('../../actions/user/updateUserRecords');
const removeUser = require('../../actions/user/removeUser');

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
router.post('/register', [validateUserReg(), validate], (req, res) => {
  registerUser(req, res);
});

// @desc        login a user
// @route       POST api/user/login
// @access      Public
router.post('/login', [validateUserLogin(), validate], (req, res) => {
  loginUser(req, res);
});

// @desc        get all user info
// @route       GET api/user/
// @access      Private, admin only
router.get('/all', auth, (req, res) => {
  // check if user is not an admin
  if (!req.user.isAdmin) {
    return res.status(401).send(strings.NOT_AUTHORIZED.EN);
  }

  getAllUsers(req, res);
});

// @desc        get user own info
// @route       GET api/user/me
// @access      Public
router.get('/me', auth, (req, res) => {
  getMe(req, res);
});

// @desc        get user info by id
// @route       GET api/user/:user_id
// @access      Public
router.get(
  '/:user_id',
  [validateObjectId('user_id', strings.NO_USER.EN), validate],
  (req, res) => {
    getUserById(req, res);
  },
);

// @desc        Edit user info
// @route       PUT api/user/
// @access      Private
router.put(
  '/editmyinfo',
  [auth, validateUserInfoEdit(), validate],
  (req, res) => {
    editUser(req, res);
  },
);

// @desc        Update records related to searches and views
// @route       PUT api/user/updaterecords
// @access      Private
router.put('/updaterecords', [auth], (req, res) => {
  updateUserRecords(req, res);
});

// @desc        delete user, either by the user itself or by admin
// @route       DELETE api/user/
// @access      Private same user or admin
router.delete(
  '/',
  [auth, validateObjectId('user_id', strings.NO_USER.EN), validate],
  (req, res) => {
    removeUser(req, res);
  },
);

module.exports = router;
