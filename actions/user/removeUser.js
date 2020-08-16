const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.body.user_id);

    // check if user existed
    if (!user) {
      return res.status(400).send(strings.NO_USER.EN);
    }

    // check for authorization
    if (req.user.id != user.id.toString() && !req.user.isAdmin) {
      return res.status(401).send(strings.NOT_AUTHORIZED.EN);
    }

    // TODO: delete any books or reviews created by the user

    // remove the user
    await user.remove();

    // inform
    return res.send(strings.SUCCESSFUL.EN);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
