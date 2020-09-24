const { body } = require('express-validator');
const strings = require('../static/strings');

const validateComplaintsPosting = () => {
  return [
    body('subject', strings.COMPLAINT_SUBJECT_REQUIRED.AR).not().isEmpty(),
    body('description', strings.COMPLAINT_DESCRIPTION_REQUIRED.AR)
      .not()
      .isEmpty(),
  ];
};
module.exports = validateComplaintsPosting;
