const request = require('supertest');
import app from '../App';
import mongoose from 'mongoose';
import { Users, UserModel } from '../models/users';
import  { createTestUser } from './test-helper';

// Test suite for /api/users/:id
describe('UserRoutes.get("/:id")', (): void => {
  beforeEach(async () => {
    // Clear existing data
    await UserModel.deleteMany({});

    // Create and save test users
    await createTestUser({ name: 'Alice', email: 'alice@example.com', password: 'foobar' });
    await createTestUser({ name: 'Bob', email: 'bob@example.com', password: 'foobar' });
  }, 100000);

  it('should return a user by ID', async (): Promise<void> => {
    // Create a test user
    const testUser = await createTestUser({});

    // Get the test user
    const response: Response = await request(app).get(`/api/users/${testUser._id}`);

    // Validate the rurned data
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', testUser.name);
    expect(response.body).toHaveProperty('email', testUser.email);
  });

  it('should return 404 if user is not found', async (): Promise<void> => {
    // Create and delete user
    const dummyUser = await createTestUser({ name: 'Dummy User', email: 'dummyuser@example.com', password: 'foobar'});
    await UserModel.deleteOne({ _id: dummyUser._id });
    const response: Response = await request(app).get(`/api/users/${dummyUser._id}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  it('should return validation error if user data is invalid', async (): Promise<void> => {
    const invalidUserId = 'invalid-id';
    const response: Response = await request(app).get(`/api/users/${invalidUserId}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Validation error', details: expect.any(Object), message: 'Invalid ID provided' });
  });
});

afterAll(async () => {
      await mongoose.connection.close();
});
    
