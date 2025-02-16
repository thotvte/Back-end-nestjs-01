import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop()
  name: string;

  @Prop({ default: true })
  isActive: boolean;  
}

export const CategorySchema = SchemaFactory.createForClass(Category);
