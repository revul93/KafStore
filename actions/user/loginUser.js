const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const strings = require('../../static/strings');
const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    // get user from db
    const user = await User.findOne({ email: req.body.email });

    // if user not exist or password is incorrect response with error
    if (!user || !bcrypt.compare(req.body.password, user.password)) {
      return res.status(400).json(strings.LOGIN_FAILED.AR);
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
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (error, token) => {
        if (error) throw error;
        return res.json(token);
      },
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send(strings.SERVER_ERROR.EN);
  }
};
