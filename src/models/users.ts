import { Schema, Document } from 'mongoose';
import { getModelForClass, prop, pre } from '@typegoose/typegoose';

export class Users {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: false, default: true })
  public id!: string;
}

const UserModel = getModelForClass(Users, {
  existingMongoose: undefined,
  schemaOptions: {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
});

export { UserModel };
