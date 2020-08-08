const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // fetch token from header
  const token = req.header('x-auth-token');

  // check if token exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization failed!' });
  }

  try {
    // fetch user from decoded token
    const decode = jwt.decode(token, config.get('jwtSecret'));
    req.user = decode.user;

    // call for the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
