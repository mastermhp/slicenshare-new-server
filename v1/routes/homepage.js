// /v1/routes/homepage.js
const express = require('express');
const { getHomepageData } = require('../controllers/homepageController');
const router = express.Router();

// Homepage data route
router.get('/', getHomepageData);

module.exports = router;