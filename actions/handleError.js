const strings = require('../static/strings');

module.exports = (error) => {
  console.error(error.message);
  res.status(500).send(strings.SERVER_ERROR);
};
