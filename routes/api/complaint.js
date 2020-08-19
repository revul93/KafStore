// modules
const express = require('express');
const strings = require('../../static/strings');
const handleError = require('../../actions/handleError');

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
router.post(
  '/',
  [auth, validateComplaintsPosting(), validate],
  async (req, res) => {
    try {
      if (
        (await sendComplaint(
          req.user.id,
          req.body.subject,
          req.body.description
        )) == strings.FAIL
      ) {
        return res.status(400).json(strings.NO_DATA);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  }
);

// @desc        get all complaints
// @route       GET api/complaint/
// @access      Private, admin only
router.get('/', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json(strings.NOT_AUTHORIZED);
  }

  try {
    const complaints = await getComplaint();
    if (!complaints) {
      return res.status(400).json(strings.NO_COMPLAINTS);
    }

    return res.json(complaints);
  } catch (error) {
    handleError(error);
  }
});

// @desc        edit action of specific complaint
// @route       PUT api/complaint/
// @access      Private, admin only
router.put(
  '/',
  [
    auth,
    validateObjectId('user_id', strings.NO_DATA),
    validateObjectId('complaint_id', strings.NO_DATA),
    validate,
  ],
  async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json(strings.NOT_AUTHORIZED);
    }
    try {
      if (
        (await editComplaint(
          req.body.user_id,
          req.body.complaint_id,
          req.body.action
        )) == strings.FAIL
      ) {
        res.status(400).json(strings.NO_DATA);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  }
);

// @desc        delete specific complaint
// @route       DELETE api/complaint/
// @access      Private, admin only
router.delete(
  '/',
  [
    auth,
    validateObjectId('user_id', strings.NO_DATA),
    validateObjectId('complaint_id', strings.NO_DATA),
    validate,
  ],
  async (req, res) => {
    if (!req.user.isAdmin) {
      return res.status(401).json(strings.NOT_AUTHORIZED);
    }
    try {
      if (
        (await removeComplaint(req.body.user_id, req.body.complaint_id)) ==
        strings.FAIL
      ) {
        res.status(400).json(strings.NO_DATA);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  }
);

module.exports = router;
