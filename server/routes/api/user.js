// modules
const express = require('express');
const strings = require('../../static/strings');
const handleError = require('../../actions/handleError');

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
      return res.status(400).json(strings.FAIL);
    }
    return res.json(strings.SUCCESS);
  } catch (error) {
    handleError(error);
  }
});

// @desc        login a user
// @route       POST api/user/login
// @access      Public
router.post('/login', [validateUserLogin(), validate], async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    if (!token) {
      return res.status(400).json(strings.LOGIN_FAILED);
    }

    return res.json(token);
  } catch (error) {
    handleError(error);
  }
});

// @desc        get user info by id
// @route       GET api/user/me
// @access      Private
router.get('/me', auth, async (req, res) => {
  try {
    const query = req.user.id;
    const field = '-password -isAdmin';
    const user = await getUser(query, field);

    if (!user) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(user);
  } catch (error) {
    handleError(error);
  }
});

// @desc        get all user info
// @route       GET api/user/all
// @access      Private, admin only
router.get('/all', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json(strings.NOT_AUTHORIZED);
  }

  try {
    const query = 'all';
    const field = '-password -viewed -searches -review';
    const users = await getUser(query, field);

    if (!users) {
      return res.json(strings.NO_REGISTERED_USERS);
    }

    return res.json(users);
  } catch (error) {
    handleError(error);
  }
});

// @desc        get user info by id
// @route       GET api/user/:user_id
// @access      Public
router.get(
  '/:user_id',
  [validateObjectId('user_id', strings.NO_DATA), validate],
  async (req, res) => {
    try {
      const query = req.params.user_id;
      const field = 'id name email review profilepic address date';
      const user = await getUser(query, field);

      if (!user) {
        return res.status(400).json(strings.NO_DATA);
      }

      return res.json(user);
    } catch (error) {
      handleError(error);
    }
  },
);

// @desc        Edit user info
// @route       PUT api/user/edit
// @access      Private
router.put(
  '/edit',
  [auth /*validateUserInfoEdit(), validate*/],
  async (req, res) => {
    try {
      if ((await updateUser(req.user.id, req.body)) == strings.FAIL) {
        return res.status(400).json(strings.NO_DATA);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  },
);

// @desc        Update records related to searches and views
// @route       PUT api/user/updaterecords
// @access      Private
router.put('/updaterecords', [auth], async (req, res) => {
  try {
    if ((await updateUser(req.user.id, req.body)) == strings.FAIL) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(strings.SUCCESS);
  } catch (error) {
    handleError(error);
  }
});

// @desc        delete user, either by the user itself or by admin
// @route       DELETE api/user/
// @access      Private, same user or admin
router.delete('/', [auth], async (req, res) => {
  try {
    const user_id = req.user.isAdmin ? req.body.user_id : req.user.id;
    if (!(await removeUser(user_id)) == strings.FAIL) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(strings.SUCCESS);
  } catch (error) {
    handleError(error);
  }
});

module.exports = router;
