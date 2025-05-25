// /v1/controllers/streamerController.js
const Streamer = require('../models/Streamer');

// Create a new streamer
exports.createStreamer = async (req, res) => {
  try {
    const { name, avatar, genre, brandedMerchandises, socialLinks } = req.body;

    // Validate required fields
    if (!name || !avatar || !genre) {
      return res.status(400).json({ message: 'Name, avatar, and genre are required!' });
    }

    // Create new streamer instance
    const newStreamer = new Streamer({
      name,
      avatar,
      genre,
      brandedMerchandises: brandedMerchandises || 0, // Use provided value or default to 0
      socialLinks: socialLinks || [], // Use provided value or default to empty array
    });

    // Save the streamer
    await newStreamer.save();
    res.status(201).json({ message: 'Streamer created successfully!', streamer: newStreamer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating streamer', error });
  }
};