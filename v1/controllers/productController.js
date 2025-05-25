// /v1/controllers/productController.js
const Product = require('../models/Product');
const Streamer = require('../models/Streamer');


// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name, price, originalPrice, image, images, streamerId, isNewDrop, isTopPick, 
      viewCount, description, colors, sizes, specifications
    } = req.body;

    console.log(req.body);

    // Ensure streamer exists
    const streamer = await Streamer.findById(streamerId);
    if (!streamer) {
      return res.status(400).json({ message: 'Streamer not found!' });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      price,
      originalPrice,
      image,
      images,
      streamerId: streamer._id,
      isNewDrop,
      isTopPick,
      viewCount,
      description,
      colors,
      sizes,
      specifications
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product', error });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id; // Get the product ID from the URL parameters
    console.log('Product ID:', productId);

    // Find the product by ID
    const product = await Product.findById(productId).populate('streamerId', 'name avatar genre');

    // If product not found, return an error message
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the product details
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createProduct, getProductById };