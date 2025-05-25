// /v1/routes/product.js
const express = require('express');
const { createProduct, getProductById } = require('../controllers/productController');
const router = express.Router();

// Create product route
router.post('/', createProduct);

// Route to get product by ID
router.get('/product/:id', getProductById);

module.exports = router;