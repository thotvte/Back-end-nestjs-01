import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;  // Hình ảnh của danh mục

  @Prop({ default: true })
  isActive: boolean;  // Trạng thái danh mục
}

export const CategorySchema = SchemaFactory.createForClass(Category);
