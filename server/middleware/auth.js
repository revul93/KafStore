const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization failed!' });
  }

  try {
    const decode = jwt.decode(token, config.get('jwtSecret'));
    req.user = decode.user;

    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
