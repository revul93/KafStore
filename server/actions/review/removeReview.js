const getUser = require('../user/getUser');
const strings = require('../../static/strings');

module.exports = async (user_id, review_id) => {
  const user = await getUser(user_id, 'review');
  if (!user || !user.review || user.review.length == 0) {
    return strings.FAIL;
  }

  user.review = await user.review.filter((review) => {
    review._id == review_id;
  });

  await user.save();
  return strings.SUCCESS;
};
