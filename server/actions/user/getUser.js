const User = require('../../models/User');

module.exports = async (user_id, fields = '') => {
  return user_id == 'all'
    ? await User.find().select(fields)
    : await User.findById(user_id)
        .select(fields)
        .populate('view', ['_id', 'title', 'author', 'isbn', 'section'])
        .populate('review.writer', ['name', 'profilepic']);
};
