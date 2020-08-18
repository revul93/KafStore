const User = require('../../models/User');
const strings = require('../../static/strings');

module.export = async () => {
  const usersWithComplaints = await User.find({
    complaint: { $ne: [] },
  }).select('id name email phone complaint');

  if (!usersWithComplaints || usersWithComplaints.length == 0) {
    return strings.FAIL;
  }

  return usersWithComplaints;
};
