const getUser = require('./getUser');
const strings = require('../../static/strings');

module.exports = async (user_id) => {
  // TODO: delete any books or reviews created by the user

  const user = await getUser(user_id);
  if (!user) {
    return strings.NO_DATA;
  }

  await user.remove();
  return strings.SUCCESS;
};
