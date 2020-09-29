const getUser = require('./getUser');
const removeUserCopies = require('../book/removeAllUserCopies');
const strings = require('../../static/strings');

module.exports = async (user_id) => {
  const user = await getUser(user_id);
  if (!user) {
    return strings.NO_DATA;
  }
  await removeUserCopies(user_id);
  await user.remove();
  return strings.SUCCESS;
};
