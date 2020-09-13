// modules
const express = require('express');
const strings = require('../../static/strings');
const handleError = require('../../actions/handleError');
const fs = require('fs');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { json } = require('express');

// router instance
const router = express.Router();

/*
 * Routes for /api/static
 * get sections
 * post section
 * delete section
 * get conditions
 */

router.get('/sections', async (req, res) => {
  const sectionsFile = fs.readFileSync('file:../../static/sections.json');
  const sections = await JSON.parse(sectionsFile);
  return res.json(sections);
});

router.post('/newsection', async (req, res) => {
  const sectionsFile = fs.readFileSync('file:../../static/sections.json');
  const sections = await JSON.parse(sectionsFile);
  sections[req.body.section] = [];
  fs.writeFileSync('file:../../static/sections.json', JSON.stringify(sections));
  return res.json(sections);
});
module.exports = router;
