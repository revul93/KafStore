const bcrypt = require('bcrypt');
const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encPassword = await bcrypt.hash(req.body.password, salt);

    // construct user model
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: encPassword,
      phone: req.body.phone,
      profilepic: req.body.profilepic,
      gender: req.body.gender,
      address: {
        country: req.body.country,
        city: req.body.city,
        district: req.body.district,
        street: req.body.street,
        description: req.body.description,
        postal: req.body.postal,
      },
    });

    // save user in db
    await user.save();

    return res.send(strings.USER_CREATED_SUCCESSFULLY.AR);
  } catch (error) {
    console.error(error);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
