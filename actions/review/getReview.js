const getUser = require('../user/getUser');
const strings = require('../../static/strings');

module.exports = async (user_id) => {
  const user = await getUser(user_id, 'review');
  if (!user) {
    return strings.FAIL;
  }

  if (!user.review || user.review.length == 0) {
    return [];
  }

  return user.review;
};
