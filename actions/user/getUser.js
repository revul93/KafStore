const User = require('../../models/User');

module.exports = async (user, fields = '') => {
  return user == 'all'
    ? await User.find().select(fields)
    : await User.findById(user).select(fields);
};
