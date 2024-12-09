const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust to the path of your Express app
const User = require('../models/user');
const Cart = require('../models/order');
const { newToken } = require('../utils/utility.function'); // Assuming this utility function is available

describe('Order Routes Tests', () => {
  let server;
  let userId;
  let token;
  let productId;

  beforeAll(async () => {
    // Start the server
    server = app.listen(4000);

    // Create a sample user for testing
    const password = await bcrypt.hash('password123', 8);
    const user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: password,
    });
    userId = user._id.toString();

    // Generate a token for authentication
    token = newToken(user);

    // Create a sample product (for adding to cart)
    const product = await Product.create({
      name: 'Sample Product',
      category: 'Casual Shoes',
      price: 100,
    });
    productId = product._id.toString();
  });

  afterAll(async () => {
    // Cleanup
    await User.deleteMany({});
    await Cart.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  describe('POST /cart', () => {
    it('should add a product to the cart', async () => {
      const res = await request(app)
        .post('/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId,
          count: 1,
        })
        .expect(201);

      expect(res.body.status).toBe('ok');
      expect(res.body.cart).toHaveProperty('productId', productId);
      expect(res.body.cart).toHaveProperty('count', 1);
    });

    it('should return an error if productId is not provided', async () => {
      const res = await request(app)
        .post('/cart')
        .set('Authorization', `Bearer ${token}`)
        .send({ count: 1 })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'ProductId is required');
    });
  });

  describe('GET /cart', () => {
    it('should get all cart products for the user', async () => {
      const res = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.status).toBe('ok');
      expect(res.body.carts).toBeInstanceOf(Array);
    });

    it('should return an error if no token is provided', async () => {
      const res = await request(app)
        .get('/cart')
        .expect(401);

      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });

  describe('DELETE /cart/:id', () => {
    it('should delete a product from the cart', async () => {
      // Add product to cart first
      const cart = await Cart.create({
        productId,
        count: 1,
        userId,
      });

      const res = await request(app)
        .delete(`/cart/${cart._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.status).toBe('ok');
    });

    it('should return an error if cart item not found', async () => {
      const invalidId = mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/cart/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(res.body).toHaveProperty('message', 'Cart item not found');
    });
  });
});
