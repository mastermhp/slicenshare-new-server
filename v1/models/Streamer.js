// /v1/models/Streamer.js
const mongoose = require('mongoose');

const streamerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Streamer name is required
  avatar: { type: String, required: true }, // Avatar image URL is required
  genre: { type: [String], required: true }, // Array of genres (e.g., gaming, music)
  brandedMerchandises: { type: Number, default: 0 }, // Default to 0 if not provided
  socialLinks: { type: [String], default: [] }, // Default to an empty array if not provided
}, { timestamps: true }); // Add timestamps (createdAt, updatedAt)

module.exports = mongoose.model('Streamer', streamerSchema);