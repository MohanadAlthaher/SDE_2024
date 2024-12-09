const express = require('express')
const {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
} = require('../controllers/order')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router
  .route('/')
  .get([verifyUser], getCartProducts)
  .post([verifyUser], addProductInCart)

router.route('/:id').delete([verifyUser], deleteProductInCart)

module.exports = router