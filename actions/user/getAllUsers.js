const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    // get users from db
    const users = await User.find().select(
      '-password -viewed -searches -complaint -review',
    );

    // if no user registered...
    if (!users) {
      return res.send(strings.NO_USERS.AR);
    }

    // else return all users
    return res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
