// modules
const express = require('express');
const path = require('path');
const strings = require('../../static/strings');
const handleError = require('../../actions/handleError');
const fs = require('fs');

// middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const { json } = require('express');

// router instance
const router = express.Router();

const sectionFilePath = path.resolve(__dirname, '../../static/sections.json');
/*
 * Routes for /api/static
 * get sections
 * post section
 * delete section
 * get conditions
 */

router.get('/sections', async (req, res) => {
  const sectionsFile = fs.readFileSync(sectionFilePath);
  const sections = await JSON.parse(sectionsFile);
  return res.json(sections);
});

router.post('/newsection', async (req, res) => {
  const sectionsFile = fs.readFileSync(sectionFilePath);
  const sections = await JSON.parse(sectionsFile);
  sections[req.body.section] = [];
  fs.writeFileSync(sectionFilePath, JSON.stringify(sections));
  return res.json(sections);
});
module.exports = router;
