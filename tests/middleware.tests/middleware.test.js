// middleware.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyUser, sendResponseError } = require('../middleware/middleware');
const User = require('../models/user');
const { verifyToken } = require('../utils/utility.function');

// Mocking User model and utility functions
jest.mock('../models/user');
jest.mock('../utils/utility.function');

// Test Setup
describe('verifyUser Middleware', () => {
  let app;
  
  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Define a test route protected by the middleware
    app.get('/protected', verifyUser, (req, res) => {
      res.status(200).send({ message: 'Protected route accessed' });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should allow access with a valid token and set req.user', async () => {
    const mockUser = { _id: 'user123', name: 'John Doe', email: 'john@example.com' };

    // Mock verifyToken to simulate a valid token
    const validToken = jwt.sign({ id: 'user123' }, 'test_secret');
    verifyToken.mockResolvedValue({ id: 'user123' });

    // Mock User.findById to return a user
    User.findById.mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Protected route accessed');
    expect(response.body.user).toEqual(mockUser);
  });

  it('should reject access if no Authorization header is provided', async () => {
    const response = await request(app).get('/protected');
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'You are not authorized ' });
  });

  it('should reject access if Authorization header is not in "Bearer token" format', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'InvalidToken');
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'You are not authorized ' });
  });

  it('should reject access if the token is invalid', async () => {
    const invalidToken = 'invalid_token';
    
    // Mock verifyToken to simulate an invalid token
    verifyToken.mockRejectedValue(new Error('Invalid token'));
    
    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${invalidToken}`);
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Error Error: Invalid token' });
  });

  it('should reject access if the user does not exist', async () => {
    const validToken = jwt.sign({ id: 'user123' }, 'test_secret');
    
    // Mock verifyToken to simulate valid payload
    verifyToken.mockResolvedValue({ id: 'user123' });

    // Mock User.findById to simulate no user found
    User.findById.mockResolvedValue(null);

    const response = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${validToken}`);
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'you are not authorizeed' });
  });
});
