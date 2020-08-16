// modules
const express = require('express');
const strings = require('../../static/strings');

// middlewares
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validateReviewPosting = require('../../middleware/validateReviewPosting');
const validateObjectId = require('../../middleware/validateObjectId');

// actions
const sendReview = require('../../actions/review/sendReview');
const getReview = require('../../actions/review/getReview');
const removeReview = require('../../actions/review/removeReview');

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
  (req, res) => {
    sendReview(req, res);
  },
);

// @desc        get all reviews of a user
// @route       GET api/review/:user_id
// @access      Public
router.get(
  '/:user_id',
  [validateObjectId('user_id', strings.NO_USER.EN), validate],
  (req, res) => {
    getReview(req, res);
  },
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
  (req, res) => {
    removeReview(req, res);
  },
);

module.exports = router;
