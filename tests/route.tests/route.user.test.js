const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../server'); // Adjust to the path of your Express app
const User = require('../models/user'); // Assuming your User model is in this path

describe('User Routes Tests', () => {
  let server;
  let userId;
  let token;

  beforeAll(async () => {
    // Start the server
    server = app.listen(4000);

    // Create a sample user for testing
    const hashedPassword = await bcrypt.hash('password123', 8);
    const user = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
    });
    userId = user._id.toString();

    // Generate token for authenticated routes
    token = await request(app)
      .post('/signin')
      .send({
        email: 'john.doe@example.com',
        password: 'password123',
      })
      .then((response) => response.body.token);
  });

  afterAll(async () => {
    // Cleanup
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      };

      const res = await request(app)
        .post('/signup')
        .send(newUser)
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Successfully account opened');
      expect(res.body.user).toHaveProperty('email', 'jane.doe@example.com');
    });

    it('should return an error if email already exists', async () => {
      const existingUser = {
        name: 'Existing User',
        email: 'john.doe@example.com', // This email already exists
        password: 'password123',
      };

      const res = await request(app)
        .post('/signup')
        .send(existingUser)
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Email already exists');
    });
  });

  describe('POST /signin', () => {
    it('should sign in a user and return a token', async () => {
      const res = await request(app)
        .post('/signin')
        .send({
          email: 'john.doe@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('token');
    });

    it('should return an error for incorrect password', async () => {
      const res = await request(app)
        .post('/signin')
        .send({
          email: 'john.doe@example.com',
          password: 'wrongpassword',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Invalid password!');
    });

    it('should return an error if user does not exist', async () => {
      const res = await request(app)
        .post('/signin')
        .send({
          email: 'non.existent@example.com',
          password: 'password123',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'User not found. Please sign up first!');
    });
  });

  describe('GET /me', () => {
    it('should return user details for authenticated user', async () => {
      const res = await request(app)
        .get('/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.user).toHaveProperty('name', 'John Doe');
      expect(res.body.user).toHaveProperty('email', 'john.doe@example.com');
    });

    it('should return an error if no token is provided', async () => {
      const res = await request(app)
        .get('/me')
        .expect(401);

      expect(res.body).toHaveProperty('message', 'Authorization required');
    });

    it('should return an error for invalid token', async () => {
      const res = await request(app)
        .get('/me')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);

      expect(res.body).toHaveProperty('message', 'Unauthorized');
    });
  });
});
