// modules
const express = require('express');
const strings = require('../../static/strings');

// middlewares
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateComplaintsPosting = require('../../middleware/validateComplaintsPosting');
const validateObjectId = require('../../middleware/validateObjectId');

// actions
const sendComplaint = require('../../actions/complaint/sendComplaint');
const getComplaint = require('../../actions/complaint/getComplaint');
const editComplaint = require('../../actions/complaint/editComplaint');
const removeComplaint = require('../../actions/complaint/removeComplaint');

// router instance
const router = express.Router();

/*
 * Routes for /api/complaint
 * Writing a complaint by a user
 * Viewing complaints
 * Editing complaints by admin
 * Deleting complaints
 */

// @desc        Post a complaint
// @route       POST api/complaint/
// @access      Private
router.post('/', [auth, validateComplaintsPosting(), validate], (req, res) => {
  sendComplaint(req, res);
});

// @desc        get all complaints
// @route       GET api/complaint/
// @access      Private, admin only
router.get('/', auth, (req, res) => {
  // check if user is not an admin
  if (!req.user.isAdmin) {
    return res.status(401).send(strings.NOT_AUTHORIZED.EN);
  }

  getComplaint(req, res);
});

// @desc        edit action of specific complaint
// @route       PUT api/complaint/
// @access      Private, admin only
router.put(
  '/',
  [
    auth,
    validateObjectId('user_id', strings.NO_USER.EN),
    validateObjectId('complaint_id', strings.NO_COMPLAINTS.EN),
    validate,
  ],
  (req, res) => {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }
    editComplaint(req, res);
  },
);

// @desc        delete specific complaint
// @route       DELETE api/complaint/
// @access      Private, admin only
router.delete(
  '/',
  [
    auth,
    validateObjectId('user_id', strings.NO_USER.EN),
    validateObjectId('complaint_id', strings.NO_COMPLAINTS.EN),
    validate,
  ],
  async (req, res) => {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }
    removeComplaint(req, res);
  },
);

module.exports = router;
