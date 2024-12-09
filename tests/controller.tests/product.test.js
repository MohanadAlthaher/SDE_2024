const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server/server'); // Adjust to the path of your Express app
const Product = require('../models/product'); // Adjust to the path of your Product model

describe('Product Controller Tests', () => {
  let server;
  let productId;

  beforeAll(async () => {
    // Start the server
    server = app.listen(4000);
    
    // Create a sample product to test against
    const product = await Product.create({
      name: 'Test Product',
      category: 'Test Category',
      price: 100,
      stock: 10,
    });
    productId = product._id.toString();
  });

  afterAll(async () => {
    // Cleanup
    await Product.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  describe('GET /products', () => {
    it('should return all products', async () => {
      const res = await request(app).get('/products').expect(200);
      
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should return products filtered by category', async () => {
      const res = await request(app)
        .get('/products?category=Test Category')
        .expect(200);

      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].category).toBe('Test Category');
    });
  });

  describe('GET /products/:id', () => {
    it('should return a product by ID', async () => {
      const res = await request(app)
        .get(`/products/${productId}`)
        .expect(200);

      expect(res.body).toHaveProperty('name', 'Test Product');
      expect(res.body).toHaveProperty('category', 'Test Category');
    });

    it('should return a 400 if the product ID is invalid', async () => {
      const res = await request(app)
        .get('/products/invalid-id')
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Invalid product ID');
    });

    it('should return a 404 if the product does not exist', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/products/${nonExistentId}`)
        .expect(404);

      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });
});
