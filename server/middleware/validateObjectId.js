const { check } = require('express-validator');
const mongoose = require('mongoose');

const validateObjectId = (id, msg) => {
  return [
    check(id)
      .exists()
      .custom((value) => {
        if (mongoose.Types.ObjectId.isValid(value)) {
          return Promise.resolve();
        } else return Promise.reject(msg);
      }),
  ];
};

module.exports = validateObjectId;
