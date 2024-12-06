const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {
  getUserById,
  getUserProfile,
  updateUserProfile,
  getUserPurchaseHistory,
} = require('../controllers/user');

// Admin-only route: View sensitive user details (example use case)
router.get('/admin/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile, // Admin access to user profile
  });
});

// User-specific routes
router.get('/user/profile/:userId', requireSignin, isAuth, getUserProfile);     // Get user profile
router.put('/user/profile/:userId', requireSignin, isAuth, updateUserProfile);  // Update user profile
router.get('/user/purchase-history/:userId', requireSignin, isAuth, getUserPurchaseHistory); // Get user's purchase history

// Middleware to handle userId parameter
router.param('userId', getUserById);

module.exports = router;
