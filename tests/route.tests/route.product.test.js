const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust to the path of your Express app
const Product = require('../models/product'); // Assuming your product model is in this path

describe('Product Routes Tests', () => {
  let server;
  let productId;

  beforeAll(async () => {
    // Start the server
    server = app.listen(4000);

    // Create a sample product for testing
    const product = await Product.create({
      name: 'Sample Product',
      category: 'Casual Shoes',
      price: 100,
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
    it('should retrieve all products', async () => {
      const res = await request(app)
        .get('/products')
        .expect(200);

      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty('name', 'Sample Product');
    });

    it('should return an empty array if no products exist', async () => {
      // Remove the created product for this test
      await Product.deleteMany({});

      const res = await request(app)
        .get('/products')
        .expect(200);

      expect(res.body).toEqual([]);
    });
  });

  describe('GET /products/:id', () => {
    it('should retrieve a product by ID', async () => {
      const res = await request(app)
        .get(`/products/${productId}`)
        .expect(200);

      expect(res.body).toHaveProperty('name', 'Sample Product');
      expect(res.body).toHaveProperty('category', 'Casual Shoes');
      expect(res.body).toHaveProperty('price', 100);
    });

    it('should return 400 if invalid ID is provided', async () => {
      const invalidId = 'invalidProductId';
      const res = await request(app)
        .get(`/products/${invalidId}`)
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Invalid product ID');
    });

    it('should return 404 if product not found', async () => {
      const nonExistentId = mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/products/${nonExistentId}`)
        .expect(404);

      expect(res.body).toHaveProperty('message', 'Product not found');
    });
  });
});
