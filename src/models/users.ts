import { prop, getModelForClass, DocumentType  } from "@typegoose/typegoose";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class Users {
  @prop({ required: true })
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @prop({ required: true })
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @prop({ required: true })
  @IsString()
  @IsNotEmpty()
  public password!: string;

  @prop({ required: false, default: true })
  @IsString()
  @IsNotEmpty()
  public id!: string;

  static async findById(id: string): Promise<DocumentType<Users> | null> {
    return UserModel.findById(id).exec();
  }
}

export const UserModel = getModelForClass(Users);