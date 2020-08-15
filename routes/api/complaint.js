// modules
const express = require('express');
const strings = require('../../static/strings');

// middlewares
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateComplaintsPosting = require('../../middleware/validateComplaintsPosting');
const validateObjectId = require('../../middleware/validateObjectId');

// models
const User = require('../../models/User');

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
      // get user
      const user = await User.findById(req.user.id);

      // check if user exist
      if (!user) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      // add the complaint to user
      user.complaint.unshift({
        subject: req.body.subject,
        description: req.body.description,
      });

      // save changes and inform
      await user.save();
      return res.send(strings.COMPLAINT_ADDED_SUCCESSFULLY.AR);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

// @desc        get all complaints
// @route       GET api/complaint/
// @access      Private, admin only
router.get('/', auth, async (req, res) => {
  try {
    // check if user is not an admin
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }

    // get users who have complaints
    const usersWithComplaints = await User.find({
      complaint: { $ne: [] },
    }).select('id name email phone complaint');

    // check if no complaint found
    if (!usersWithComplaints || usersWithComplaints.length == 0) {
      res.send(strings.NO_COMPLAINTS.AR);
    }

    // response
    return res.json(usersWithComplaints);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
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
  async (req, res) => {
    try {
      // check if user is not an admin
      if (!req.user.isAdmin) {
        return res.status(401).send(strings.NOT_AUTHORIZED.EN);
      }

      // get user
      const user = await User.findById(req.body.user_id);

      if (!user.complaint || user.complaint.length == 0) {
        return res.send(strings.NO_COMPLAINTS.AR);
      }

      // find complaint index
      let complaint_index = user.complaint.findIndex(
        (c) => c._id == req.body.complaint_id
      );

      // if complaint not found
      if (complaint_index == -1) {
        console.log('not found');
        return res.status(400).send(strings.NO_COMPLAINTS.AR);
      }

      //else edit action
      user.complaint[complaint_index].action = req.body.action;

      // save changes and inform
      await user.save();
      return res.json(strings.SUCCESSFUL.AR);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(strings.SERVER_ERROR.EN);
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
    validateObjectId('user_id', strings.NO_USER.EN),
    validateObjectId('complaint_id', strings.NO_COMPLAINTS.EN),
    validate,
  ],
  async (req, res) => {
    try {
      // check if user is not an admin
      if (!req.user.isAdmin) {
        return res.status(401).send(strings.NOT_AUTHORIZED.EN);
      }

      // get user
      const user = await User.findById(req.body.user_id);

      if (!user.complaint || user.complaint.length == 0) {
        return res.send(strings.NO_COMPLAINTS.AR);
      }

      // remove complaint
      user.complaint = user.complaint.filter(
        (c) => c._id != req.body.complaint_id
      );

      // save changes and inform
      await user.save();
      return res.json(strings.SUCCESSFUL.AR);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

module.exports = router;
