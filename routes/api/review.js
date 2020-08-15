// modules
const express = require('express');
const strings = require('../../static/strings');

// middlewares
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateReviewPosting = require('../../middleware/validateReviewPosting');
const validateObjectId = require('../../middleware/validateObjectId');

// models
const User = require('../../models/User');

// router instance
const router = express.Router();

/*
 * Routes for /api/review
 * Writing a review about a user
 * Viewing all reviews about a user
 * Deleting a review
 */

// @desc        Post a review of a user
// @route       POST api/review/
// @access      Private
router.post(
  '/',
  [
    auth,
    validateReviewPosting(),
    validateObjectId('user_id', strings.NO_USER.EN),
    validate,
  ],
  async (req, res) => {
    /*********** TODO *********
     * check if buyer user had purchased from seller user
     **************************/

    try {
      // get the reviewer user (by), and the revuewed user (to)
      const by = await User.findById(req.user.id);
      const to = await User.findById(req.body.user_id);

      // check if both users exist
      if (!by || !to) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      // add the review to the reviewed user
      to.review.unshift({
        writer: by.id,
        rating: req.body.rating,
        text: req.body.text,
      });
      await to.save();

      return res.send(strings.REVIEW_ADDED_SUCCESSFULLY.AR);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

// @desc        get all reviews of a user
// @route       GET api/review/:user_id
// @access      Public
router.get(
  '/:user_id',
  [validateObjectId('user_id', strings.NO_USER.EN), validate],
  async (req, res) => {
    try {
      // get user and check for errors
      const user = await User.findById(req.params.user_id);
      if (!user) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      // if no review about the user found
      if (!user.review) {
        return res.send(strings.NO_REVIEWS.AR);
      }

      // else ...
      return res.json(user.review);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

// @desc        delete a review
// @route       DELETE api/review/
// @access      Private, admin only
router.delete(
  '/',
  [
    auth,
    validateObjectId('user_id', strings.NO_USER.EN),
    validateObjectId('review_id', strings.REVIEW_INVALID.EN),
    validate,
  ],
  async (req, res) => {
    try {
      // only admin can delete a review
      if (!req.user.isAdmin) {
        return res.status(401).send(strings.NOT_AUTHORIZED.EN);
      }

      // get user
      const user = await User.findById(req.body.user_id).select(
        'id name review'
      );
      if (!user) {
        return res.status(400).send(strings.NO_USER.EN);
      }

      // find the review
      const review = await user.review.find(
        (elem) => elem._id == req.body.review_id
      );
      if (!review) {
        return res.status(400).send(strings.NO_REVIEWS.EN);
      }

      // found the index of the review then remove it
      user.review.splice(user.review.indexOf(review), 1);

      // save changes
      await user.save();
      return res.send(strings.SUCCESSFUL.AR);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(strings.SERVER_ERROR.EN);
    }
  }
);

module.exports = router;
