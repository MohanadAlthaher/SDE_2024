const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = require('../../server/server'); // Adjust to the path of your Express app
const User = require('../models/user'); // Adjust to the path of your User model
const { newToken } = require('../utils/utility.function'); // Assuming this utility function is available

describe('User Controller Tests', () => {
  let server;
  let userId;
  let token;

  beforeAll(async () => {
    // Start the server
    server = app.listen(4000);

    // Create a sample user for testing sign-in
    const password = await bcrypt.hash('password123', 8);
    const user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: password,
    });
    userId = user._id.toString();
    
    // Generate a token for authentication in getUser tests
    token = newToken(user);
  });

  afterAll(async () => {
    // Cleanup
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  describe('POST /signup', () => {
    it('should sign up a new user', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'newpassword123',
        })
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Successfully account opened');
      expect(res.body.user).toHaveProperty('name', 'New User');
      expect(res.body.user).toHaveProperty('email', 'newuser@example.com');
    });

    it('should return an error if email already exists', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          name: 'Test User',
          email: 'testuser@example.com', // Already exists
          password: 'password123',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Email already exists');
    });
  });

  describe('POST /signin', () => {
    it('should sign in an existing user with correct credentials', async () => {
      const res = await request(app)
        .post('/signin')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
        })
        .expect(200);

      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('name', 'Test User');
      expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
    });

    it('should return an error if user is not found', async () => {
      const res = await request(app)
        .post('/signin')
        .send({
          email: 'nonexistentuser@example.com',
          password: 'password123',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'User not found. Please sign up first!');
    });

    it('should return an error for incorrect password', async () => {
      const res = await request(app)
        .post('/signin')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword',
        })
        .expect(400);

      expect(res.body).toHaveProperty('message', 'Invalid password!');
    });
  });

  describe('GET /user', () => {
    it('should return user data for authenticated user', async () => {
      const res = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('name', 'Test User');
      expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
    });

    it('should return an error if no token is provided', async () => {
      const res = await request(app)
        .get('/user')
        .expect(401);

      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });
});
