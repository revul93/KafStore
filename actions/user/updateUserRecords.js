const User = require('../../models/User');
const strings = require('../../static/strings');

module.exports = async (req, res) => {
  try {
    // get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send(strings.NO_USER.AR);
    }

    // get name of record to update
    const record = req.body.search ? 'search' : req.body.view ? 'view' : null;
    if (!record) {
      return res.status(400).send(strings.MISSING_INFO.EN);
    }

    // maximum record length to keep is 100
    if (user[record].length > 100) {
      user[record].pop();
    }
    // add record
    user[record].unshift(req.body[record]);

    // save changes and inform+
    await user.save();
    return res.send(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
