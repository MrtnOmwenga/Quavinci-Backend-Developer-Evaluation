import app from '../App';
import mongoose from 'mongoose';
const request = require('supertest');
import { Users, UserModel } from '../models/users';
import  { createTestUser } from './test-helper';

beforeEach(async () => {
  // Clear existing data
  await UserModel.deleteMany({});

  // Create and save test users
  await createTestUser({});
  await createTestUser({ name: 'Alice', email: 'alice@example.com', password: 'foobar' });
  await createTestUser({ name: 'Bob', email: 'bob@example.com', password:'foobar' });
  // Add more test users as needed
}, 100000);

describe('OtherRoutes Endpoints', () => {
  // Test the GET endpoint
  describe('GET /api/other', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/api/other');
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(3);
    }, 50000);
  });

  // Test the POST endpoint
  describe('POST /api/other', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/other')
        .send(newUser);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('id');

    }, 50000);

    it('should handle invalid input', async () => {
      // Test case for handling invalid input
      const invalidUser = {
        name: 'Invalid User',
        // Omitting required fields intentionally
      };

      const response = await request(app)
        .post('/api/other')
        .send(invalidUser);

      expect(response.status).toBe(400);
      // Add more assertions based on your expected error response structure
    }, 50000);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
