// /v1/routes/streamer.js
const express = require('express');
const { createStreamer } = require('../controllers/streamerController');
const router = express.Router();

// Create streamer route
router.post('/', createStreamer);

module.exports = router;