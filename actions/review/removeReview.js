const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    // only admin can delete a review
    if (!req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }

    // get user
    const user = await User.findById(req.body.user_id).select('id name review');
    if (!user) {
      return res.status(400).send(strings.NO_USER.EN);
    }

    // find the review
    const review = await user.review.find(
      (elem) => elem._id == req.body.review_id,
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
};
