const strings = require('../../static/strings');
const User = require('../../models/User');

module.export = async (req, res) => {
  try {
    // get users who have complaints
    const usersWithComplaints = await User.find({
      complaint: { $ne: [] },
    }).select('id name email phone complaint');

    // check if no complaint found
    if (!usersWithComplaints || usersWithComplaints.length == 0) {
      res.send(strings.NO_COMPLAINTS.AR);
    }

    // response
    return res.json(usersWithComplaints);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
