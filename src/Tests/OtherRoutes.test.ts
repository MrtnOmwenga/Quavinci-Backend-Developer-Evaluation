import app from '../App';
import mongoose from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
const request = require('supertest');
import { Users, UserModel } from '../models/users';

async function createTestUser(userData: Partial<Users>): Promise<DocumentType<Users>> {
  const user = new UserModel({
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword',
    ...userData,
  });
  return user.save();
}


describe('OtherRoutes Endpoints', () => {
  // Test the GET endpoint
  describe('GET /api/other', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/api/other');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      // Add more assertions based on your expected response structure
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
      // Add more assertions based on your expected response structure

      // Optionally, you may want to store the created user's ID for cleanup in future tests
      const createdUserId = response.body.id;
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
