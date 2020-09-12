const express = require('express');
const router = express.Router();

const strings = require('../../static/strings');
const signS3Url = require('../../actions/signS3Url');
const handleError = require('../../actions/handleError');

// @desc        get signed url to upload images to s3
// @route       POST api/utils/sign_url
// @access      Public
router.get('/sign_url', async (req, res) => {
  try {
    const signedURL = await signS3Url(
      decodeURI(req.query.filename),
      decodeURI(req.query.filetype)
    );
    if (!signedURL) {
      return res.status(400).json(strings.NO_DATA);
    }
    return res.json(signedURL);
  } catch (error) {
    handleError(error);
  }
});

module.exports = router;
