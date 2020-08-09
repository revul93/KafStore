const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const router = express.Router();

// @route       POST api/user/review/:user_id
// @desc        Post a review of a user
// @access      Private
router.post(
  '/:user_id',
  [
    auth,
    [
      check('rating')
        .isNumeric()
        .custom((rate) => {
          if (rate < 1 || rate > 5) {
            return Promise.reject('الرجاء إدخال قيمة بين 1 و 5');
          }
          return Promise.resolve();
        }),
    ],
  ],
  async (req, res) => {
    /*********** TODO *********
     * check if buyer user had purchased from seller user
     **************************/

    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const byUser = await User.findById(req.user.id);
      const toUser = await User.findById(req.params.user_id);

      if (!byUser || !toUser) {
        return res.status(400).send("User doesn't exist");
      }

      toUser.review.unshift({
        writer: byUser.id,
        rating: req.body.rating,
        text: req.body.text,
      });
      await toUser.save();
      return res.send('تم إضافة التقييم بنجاح');
    } catch (error) {
      console.error(error.message);
      if (error.kind == 'ObjectId') {
        return res.status(400).send("User doesn't exist");
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET api/user/review/:user_id
// @desc        get all reviews of a user
// @access      Public
router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    if (!user.review) {
      return res.send('لا يوجد تقييمات!');
    }
    return res.json(user.review);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).send("User doesn't exist");
    }
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/user/review/:user_id
// @desc        delete a review
// @access      Private, admin only
router.delete('/:user_id/:review_id', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(401).send('Not authorized');
    }
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    user.review.splice(
      user.review.indexOf(
        user.review.find((elem) => elem._id == req.params.review_id)
      ),
      1
    );
    await user.save();
    return res.send('Delete successful!');
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).send("User doesn't exist");
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
