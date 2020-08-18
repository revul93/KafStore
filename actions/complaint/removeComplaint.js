const strings = require('../../static/strings');
const getUser = require('../user/getUser');

module.export = async (user_id, complaint_id) => {
  const user = await getUser(user_id);
  if (!user || !user.complaint || user.complaint.length == 0) {
    return strings.FAIL;
  }

  user.complaint = await user.complaint.filter((complaint) => {
    complaint._id == complaint_id;
  });

  await user.save();
  return strings.SUCCESS;
};
