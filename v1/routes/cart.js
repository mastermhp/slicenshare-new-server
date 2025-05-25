// /v1/routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart, removeFromCart, updateCart } = require('../controllers/cartController');
const router = express.Router();

// Add product to cart
router.post('/add', addToCart);

// Get user's cart
router.get('/', getCart);

// Remove product from cart
router.delete('/remove', removeFromCart);

// Update cart item quantity
router.put('/update', updateCart);

module.exports = router;