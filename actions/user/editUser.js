const strings = require('../../static/strings');
const bcrypt = require('bcrypt');

const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send(strings.NO_USER.AR);
    }

    user.name = req.body.name;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const encPassword = await bcrypt.hash(req.body.password, salt);
      user.password = encPassword;
    }
    user.phone = req.body.phone;
    user.gender = req.body.gender;
    user.profilepic = req.body.profilepic;
    user.address.country = req.body.country;
    user.address.city = req.body.city;
    user.address.district = req.body.district;
    user.address.street = req.body.street;
    user.address.description = req.body.description;
    user.address.postal = req.body.postal;

    await user.save();
    return res.send(strings.SUCCESSFUL.AR);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
