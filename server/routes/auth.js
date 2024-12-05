const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
  resetPassword,
  forgotPassword,
  verifyEmail,
} = require('../controllers/auth');
const { userSignupValidator, userSigninValidator } = require('../validator');

// Customer routes
router.post('/signup', userSignupValidator, signup);  // Sign up new user
router.post('/signin', userSigninValidator, signin);  // Sign in user
router.get('/signout', signout);                      // Sign out user

// Password management
router.post('/forgot-password', forgotPassword);      // Request password reset
router.post('/reset-password', resetPassword);        // Reset password

// Email verification
router.get('/verify-email/:token', verifyEmail);      // Verify user's email

// Middleware to protect routes
router.use(requireSignin);

// Example of a protected route (can be expanded for e-commerce purposes)
router.get('/profile', (req, res) => {
  res.json({ message: 'This is a protected route for authenticated users.' });
});

module.exports = router;