import { IsString, IsEmail, IsNotEmpty, IsBoolean, IsMongoId, IsInt, Min } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsBoolean()
  id!: boolean;

  @IsNotEmpty()
  @IsMongoId()
  _id!: ObjectId;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  __v!: number;
}

export default UserDto;
