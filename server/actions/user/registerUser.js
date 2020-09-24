const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const encPassword = await bcrypt.hash(data.password, salt);

  const user = new User({
    name: data.name,
    email: data.email,
    password: encPassword,
    phone: data.phone,
    profilepic: data.profilepic,
    gender: data.gender,
    address: {
      country: data.country,
      city: data.city,
      district: data.district,
      street: data.street,
      description: data.description,
      postal: data.postal,
    },
  });
  await user.save();
  return user;
};
