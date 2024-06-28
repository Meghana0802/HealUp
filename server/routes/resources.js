const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// @route GET /api/resources
// @desc Get all resources
// @access Public
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
