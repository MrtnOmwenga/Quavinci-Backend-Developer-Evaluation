import { DocumentType } from '@typegoose/typegoose';
import { Users, UserModel } from '../models/users';

// Function for creating test users.
export async function createTestUser(userData: Partial<Users>): Promise<DocumentType<Users>> {
      const user = new UserModel({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        ...userData,
      });
      return user.save();
    }