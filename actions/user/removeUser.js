const getUser = require('./getUser');
const User = require('../../models/User');

module.exports = async (user_id) => {
  // TODO: delete any books or reviews created by the user

  const user = await getUser(user_id);
  if (!user) {
    return false;
  }

  // remove the user
  await user.remove();
  return true;
};
