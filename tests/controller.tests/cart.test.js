const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server/server'); // Adjust the path to your Express app
const Cart = require('../models/order'); // Adjust the path to your Cart model

describe('Cart Controller Tests', () => {
  let server, token, userId;

  beforeAll(async () => {
    // Start the server
    server = app.listen(4000);

    // Mock user authentication and get a token
    userId = new mongoose.Types.ObjectId(); // Create a mock user ID
    token = 'mock-token'; // Replace with actual token logic if applicable
  });

  afterAll(async () => {
    // Cleanup
    await Cart.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  describe('GET /cart', () => {
    it('should retrieve the user\'s cart products', async () => {
      // Seed the database with a cart item
      await Cart.create({
        productId: new mongoose.Types.ObjectId(),
        userId,
        count: 2,
      });

      const res = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`) // Mock authentication
        .expect(200);

      expect(res.body.status).toBe('ok');
      expect(Array.isArray(res.body.carts)).toBe(true);
      expect(res.body.carts.length).toBeGreaterThan(0);
    });
  });

  describe('POST /cart', () => {
    it('should add a product to the cart', async () => {
      const productId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .post('/cart')
        .set('Authorization', `Bearer ${token}`) // Mock authentication
        .send({ productId, count: 1 })
        .expect(201);

      expect(res.body.status).toBe('ok');
      expect(res.body.cart.productId).toBe(String(productId));
      expect(res.body.cart.userId).toBe(String(userId));
      expect(res.body.cart.count).toBe(1);
    });
  });

  describe('DELETE /cart/:id', () => {
    it('should delete a product from the cart', async () => {
      const cart = await Cart.create({
        productId: new mongoose.Types.ObjectId(),
        userId,
        count: 2,
      });

      const res = await request(app)
        .delete(`/cart/${cart._id}`)
        .set('Authorization', `Bearer ${token}`) // Mock authentication
        .expect(200);

      expect(res.body.status).toBe('ok');

      const deletedCart = await Cart.findById(cart._id);
      expect(deletedCart).toBeNull();
    });
  });
});
