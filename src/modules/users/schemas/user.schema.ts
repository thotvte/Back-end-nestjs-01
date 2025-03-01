import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({default:'USER'})
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({default:'Không xác định'})
  phone: string;

  @Prop({default:'Không xác định'})
  address: string;

  @Prop()
  image: string;

  @Prop({ type: String, enum: ['USER', 'ADMIN'], default: 'USER'})
  role: string

  @Prop({ default: "LOCAL" })
  accountType: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
