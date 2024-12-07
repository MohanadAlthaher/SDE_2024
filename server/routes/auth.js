const express = require('express');
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin,
    resetPassword,
    forgotPassword,
    verifyEmail
} = require('../controllers/auth');
const { userSignupValidator, userSigninValidator } = require('../validator');

// Customer routes
router.post('/signup', userSignupValidator, signup);
router.post('/signin', userSigninValidator, signin);
router.get('/signout', signout);

// Password management
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Email verification
router.get('/verify-email/:token', verifyEmail);

// Protected route example
router.get('/profile', requireSignin, (req, res) => {
    res.json({ message: 'This is a protected route for authenticated users.' });
});

module.exports = router;