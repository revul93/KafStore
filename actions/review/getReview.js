const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
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
};
