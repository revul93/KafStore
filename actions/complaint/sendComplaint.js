const getUser = require('../user/getUser');
const strings = require('../../static/strings');

module.export = async (sender_id, subject, description) => {
  const user = await getUser(sender_id, 'complaint');

  if (!user) {
    return strings.FAIL;
  }

  user.complaint.unshift({
    subject: subject,
    description: description,
  });

  await user.save();
  return strings.SUCCESS;
};
