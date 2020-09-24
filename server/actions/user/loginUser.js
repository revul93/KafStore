const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return;
  }

  const payload = {
    user: {
      id: user.id,
      isAdmin: user.isAdmin,
    },
  };

  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 });
};
