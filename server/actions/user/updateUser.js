const bcrypt = require('bcrypt');
const strings = require('../../static/strings');
const getUser = require('./getUser');

module.exports = async (user_id, data) => {
  const user = await getUser(user_id);
  if (!user) {
    return strings.FAIL;
  }

  if (data.name) user.name = data.name;
  if (data.phone) user.phone = data.phone;
  if (data.gender) user.gender = data.gender;
  if (data.profilepic) user.profilepic = data.profilepic;
  if (data.country) user.address.country = data.country;
  if (data.city) user.address.city = data.city;
  if (data.district) user.address.district = data.district;
  if (data.street) user.address.street = data.street;
  if (data.description) user.address.description = data.description;
  if (data.postal) user.address.postal = data.postal;

  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(data.password, salt);
    user.password = encPassword;
  }

  if (data.search) {
    if (user.search.length > 10) {
      user.search.pop();
    }
    user.search.unshift(data.search);
  }

  if (!user.view.find((book) => book._id.toString() === data.view.toString())) {
    if (data.view) {
      if (user.view.length > 10) {
        user.view.pop();
      }
      user.view.unshift(data.view);
    }
  }

  await user.save();
  return strings.SUCCESS;
};
