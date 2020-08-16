const strings = require('../../static/strings');
const User = require('../../models/User');

module.export = async (req, res) => {
  try {
    // get user
    const user = await User.findById(req.body.user_id);

    if (!user.complaint || user.complaint.length == 0) {
      return res.send(strings.NO_COMPLAINTS.AR);
    }

    // remove complaint
    user.complaint = user.complaint.filter(
      (c) => c._id != req.body.complaint_id,
    );

    // save changes and inform
    await user.save();
    return res.json(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
