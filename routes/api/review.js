// modules
const express = require('express');
const strings = require('../../static/strings');
const handleError = require('../../actions/handleError');

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
    validateObjectId('user_id', strings.NO_DATA),
    validate,
  ],
  async (req, res) => {
    try {
      if (
        (await sendReview(
          req.user.id,
          req.body.user,
          req.body.rating,
          req.body.text,
        )) == strings.FAIL
      ) {
        res.status(400).json(strings.FAIL);
      }
      return res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  },
);

// @desc        get all reviews of a user
// @route       GET api/review/:user_id
// @access      Public
router.get(
  '/:user_id',
  [validateObjectId('user_id', strings.NO_DATA), validate],
  async (req, res) => {
    try {
      const response = await getReview(req.params.user_id);
      if (response == strings.FAIL) {
        return res.status(400).json(strings.FAIL);
      }

      if (response.length == 0) {
        return res.status(400).json(strings.NO_REVIEWS);
      }
      return res.json(response);
    } catch (error) {
      handleError(error);
    }
  },
);

// @desc        delete a review
// @route       DELETE api/review/
// @access      Private, admin only
router.delete(
  '/',
  [
    auth,
    validateObjectId('user_id', strings.NO_DATA),
    validateObjectId('review_id', strings.NO_DATA),
    validate,
  ],
  async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(401).json(strings.NOT_AUTHORIZED);
      }

      if (
        (await removeReview(req.body.user_id, req.body.review_id)) ==
        strings.FAIL
      ) {
        res.status(400).json(strings.NO_DATA);
      }
      res.json(strings.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  },
);

module.exports = router;
