const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// 1. Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, color, size, guestId } = req.body;  // Accept guestId in the request body

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user is logged in
    const userId = req.user ? req.user._id : null; // Assuming `req.user` contains the signed-in user details

    let cart;

    if (userId) {
      // User is logged in
      cart = await Cart.findOne({ userId });

      if (cart) {
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex >= 0) {
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity, color, size });
        }
        await cart.save();
      } else {
        cart = new Cart({
          userId,
          items: [{ productId, quantity, color, size }]
        });
        await cart.save();
      }
    } else {
      // Handle guest user (no login) by using guestId passed in the body
      if (!guestId) {
        return res.status(400).json({ message: 'Guest ID is required for guest users' });
      }

      cart = await Cart.findOne({ userId: guestId });

      if (cart) {
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex >= 0) {
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity, color, size });
        }
        await cart.save();
      } else {
        cart = new Cart({
          userId: guestId,
          items: [{ productId, quantity, color, size }]
        });
        await cart.save();
      }
    }

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 2. Get Cart
const getCart = async (req, res) => {
  try {
    // Get the userId from the request, either from req.user (logged-in user) or guestId from the body
    const userId = req.user ? req.user._id : req.body.guestId;
    console.log('User ID:', userId);

    if (!userId) {
      return res.status(400).json({ message: 'User or guest is required to get cart' });
    }

    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price image');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 3. Remove Product from Cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const guestId = req.body.guestId;  // Accept guestId in the request body

    const userId = req.user ? req.user._id : guestId;

    if (!userId) {
      return res.status(400).json({ message: 'User or guest is required to remove from cart' });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the product from cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 4. Update Product Quantity in Cart
const updateCart = async (req, res) => {
  try {
    const { productId, quantity, color, size } = req.body;
    const guestId = req.body.guestId;  // Accept guestId in the request body

    const userId = req.user ? req.user._id : guestId;

    if (!userId) {
      return res.status(400).json({ message: 'User or guest is required to update cart item' });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.items.find(item => item.productId.toString() === productId);

    if (cartItem) {
      cartItem.quantity = quantity;
      cartItem.color = color || cartItem.color;
      cartItem.size = size || cartItem.size;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();

    res.status(200).json({ message: 'Cart item updated', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addToCart, getCart, removeFromCart, updateCart };