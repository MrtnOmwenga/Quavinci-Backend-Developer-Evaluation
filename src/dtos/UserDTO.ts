import { IsString, IsEmail, IsNotEmpty, Length, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';

// Data transformation object for validating User data
export class UserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, undefined, { message: 'The string must be at least 4 characters long' })
  password!: string;
}

export class UserIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id!: string;
}
