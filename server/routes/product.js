const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProductById,
  getProductDetails,
  updateProduct,
  deleteProduct,
  listAllProducts,
  listRelatedProducts,
  searchProducts,
  filterProductsByCriteria,
  getProductPhoto
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// Public routes
router.get('/product/:productId', getProductDetails);           // Get product details
router.get('/products', listAllProducts);                      // List all products
router.get('/products/related/:productId', listRelatedProducts); // List related products
router.get('/products/search', searchProducts);                // Search products
router.post('/products/filter', filterProductsByCriteria);     // Filter products by criteria
router.get('/product/photo/:productId', getProductPhoto);       // Get product photo

// Admin routes
router.post(
  '/product/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
); // Create a new product

router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateProduct
); // Update a product

router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  deleteProduct
); // Delete a product

// Parameter extraction
router.param('userId', userById);          // Extract userId for authentication
router.param('productId', getProductById); // Extract productId for product operations

module.exports = router;
