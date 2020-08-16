const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.user.id).select(
      '-password -isAdmin -viewed -searches -complaint -review',
    );

    // if no user found
    if (!user) {
      return res.status(400).send(strings.NO_USER.EN);
    }

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
