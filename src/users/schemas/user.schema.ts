import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
//  định nghĩa một kiểu UserDocument, là một loại dữ liệu (type) tương tự với kiểu Document của Mongoose.
// đại diện cho một bản ghi (document) của model "User" trong cơ sở dữ liệu MongoDB.

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  createAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deleteAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
// Tạo một schema thực tế từ class "User". 