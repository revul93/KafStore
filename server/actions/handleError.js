const strings = require('../static/strings');

module.exports = (error) => {
  console.error(error);
  res.status(500).send(strings.SERVER_ERROR);
};
