const strings = require('../../static/strings');
const User = require('../../models/User');

module.export = async (req, res) => {
  try {
    // get user
    const user = await User.findById(req.user.id);

    // check if user exist
    if (!user) {
      return res.status(400).send(strings.NO_USER.EN);
    }

    // add the complaint to user
    user.complaint.unshift({
      subject: req.body.subject,
      description: req.body.description,
    });

    // save changes and inform
    await user.save();
    return res.send(strings.COMPLAINT_ADDED_SUCCESSFULLY.AR);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
