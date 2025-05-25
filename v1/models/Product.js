// /v1/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
  streamerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Streamer', required: true },
  isNewDrop: { type: Boolean, default: false },
  isTopPick: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  description: { type: String, required: false },
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  specifications: {
    "Special Features": { type: [String], default: [] },
    "Closure Type": { type: String },
    "Craft of Weaving": { type: String },
    "Applicable Scene": { type: [String], default: [] },
    "Hooded": { type: String },
    "Collar": { type: String },
    "Style": { type: String },
    "City of Origin": { type: String },
    "Tops Type": { type: String },
    "Care Instructions": { type: [String], default: [] },
    "Applicable Season": { type: [String], default: [] },
    "Place of Origin": { type: String },
    "Pattern Type": { type: String },
    "Material": { type: [String], default: [] },
    "Sleeve Length": { type: String },
    "Factory": { type: String },
    "Gender": { type: [String], default: [] },
    "Item Type": { type: [String], default: [] },
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);