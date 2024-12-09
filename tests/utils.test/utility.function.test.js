// utility.function.test.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkPassword, newToken, verifyToken } = require('../utils/utility.function');
const { JWT } = require('../config/config');

// Mocking bcrypt and jsonwebtoken
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Utility Functions', () => {
  describe('checkPassword', () => {
    it('should resolve to true if password matches', async () => {
      const password = 'password123';
      const hashedPassword = 'hashed_password123';

      // Mock bcrypt.compare to simulate password match
      bcrypt.compare.mockImplementation((password, hash, cb) => cb(null, true));

      const result = await checkPassword(password, hashedPassword);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword, expect.any(Function));
    });

    it('should resolve to false if password does not match', async () => {
      const password = 'password123';
      const hashedPassword = 'hashed_password123';

      // Mock bcrypt.compare to simulate password mismatch
      bcrypt.compare.mockImplementation((password, hash, cb) => cb(null, false));

      const result = await checkPassword(password, hashedPassword);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword, expect.any(Function));
    });

    it('should reject if bcrypt.compare fails', async () => {
      const password = 'password123';
      const hashedPassword = 'hashed_password123';

      // Mock bcrypt.compare to simulate error
      bcrypt.compare.mockImplementation((password, hash, cb) => cb(new Error('bcrypt error')));

      await expect(checkPassword(password, hashedPassword)).rejects.toThrow('bcrypt error');
    });
  });

  describe('newToken', () => {
    it('should generate a new token', () => {
      const user = { _id: 'user123' };
      const token = 'mocked_jwt_token';

      // Mock jwt.sign to simulate token generation
      jwt.sign.mockReturnValue(token);

      const result = newToken(user);

      expect(result).toBe(token);
      expect(jwt.sign).toHaveBeenCalledWith({ id: user._id }, JWT.jwt, { expiresIn: JWT.jwtExp });
    });
  });

  describe('verifyToken', () => {
    it('should resolve to payload if token is valid', async () => {
      const token = 'valid_token';
      const payload = { id: 'user123' };

      // Mock jwt.verify to simulate valid token verification
      jwt.verify.mockImplementation((token, secret, cb) => cb(null, payload));

      const result = await verifyToken(token);

      expect(result).toEqual(payload);
      expect(jwt.verify).toHaveBeenCalledWith(token, JWT.jwt, expect.any(Function));
    });

    it('should reject if token is invalid or expired', async () => {
      const token = 'invalid_token';
      const error = new Error('invalid token');

      // Mock jwt.verify to simulate invalid token error
      jwt.verify.mockImplementation((token, secret, cb) => cb(error));

      await expect(verifyToken(token)).rejects.toThrow('invalid token');
    });
  });
});
