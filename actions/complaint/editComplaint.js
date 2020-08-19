const strings = require('../../static/strings');
const getUser = require('../user/getUser');

module.exports = async (user_id, complaint_id, action) => {
  const user = await getUser(user_id, 'complaint');
  if (!user.complaint || user.complaint.length == 0) {
    return strings.FAIL;
  }

  let complaint_index = user.complaint.findIndex(
    (complaint) => complaint._id == complaint_id
  );

  if (complaint_index == -1) {
    return strings.FAIL;
  }

  user.complaint[complaint_index].action = action;
  await user.save();
  return strings.SUCCESS;
};
