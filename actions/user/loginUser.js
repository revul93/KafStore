const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = async (email, password) => {
  // get user from db
  const user = await User.findOne({ email });

  // if user not exist or password is incorrect return false
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return false;
  }

  // else confirm login and send back jwt token
  // create payload to associate it with token
  const payload = {
    user: {
      id: user.id,
      isAdmin: user.isAdmin,
    },
  };

  // generate token and return it back
  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 });
};
