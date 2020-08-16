const strings = require('../../static/strings');
const User = require('../../models/User');

module.export = async (req, res) => {
  try {
    // get user
    const user = await User.findById(req.body.user_id);

    if (!user.complaint || user.complaint.length == 0) {
      return res.send(strings.NO_COMPLAINTS.AR);
    }

    // find complaint index
    let complaint_index = user.complaint.findIndex(
      (c) => c._id == req.body.complaint_id,
    );

    // if complaint not found
    if (complaint_index == -1) {
      console.log('not found');
      return res.status(400).send(strings.NO_COMPLAINTS.AR);
    }

    //else edit action
    user.complaint[complaint_index].action = req.body.action;

    // save changes and inform
    await user.save();
    return res.json(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
