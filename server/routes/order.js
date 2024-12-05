const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const {
  createOrder,
  listUserOrders,
  listAllOrders,
  getOrderStatusValues,
  updateOrderStatus,
  orderById,
} = require('../controllers/order');
const { decreaseProductQuantity } = require('../controllers/product');

// Create a new order (for authenticated users)
router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseProductQuantity,
  createOrder
);

// List all orders for a specific user (e.g., order history)
router.get(
  '/order/user-orders/:userId',
  requireSignin,
  isAuth,
  listUserOrders
);

// Admin: List all orders in the system
router.get(
  '/order/list-all/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  listAllOrders
);

// Admin: Get possible order status values (e.g., Pending, Shipped, Delivered)
router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getOrderStatusValues
);

// Admin: Update order status (e.g., from Pending to Shipped)
router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

// Route parameters for extracting userId and orderId
router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
