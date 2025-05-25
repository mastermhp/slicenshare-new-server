// /v1/controllers/homepageController.js
const Product = require('../models/Product');
const Streamer = require('../models/Streamer');

// Fetch data for homepage
const getHomepageData = async (req, res) => {
  try {
    // Fetch favorite streamers (you can change the limit based on your need)
    const streamers = await Streamer.find().limit(5);

    // Fetch "Just Dropped" products
    const justDropped = await Product.find({ isNewDrop: true }).sort({ _id: -1 }).limit(5);

    // Fetch "Top Picks" products
    const topPicks = await Product.find({ isTopPick: true }).limit(5);

    // Fetch "Most Viewed" products (based on viewCount)
    const mostViewed = await Product.find().sort({ viewCount: -1 }).limit(5);

    // Send data as response
    res.status(200).json({
      streamers,
      justDropped,
      topPicks,
      mostViewed,
    });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getHomepageData };