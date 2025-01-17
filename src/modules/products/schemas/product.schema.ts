import { Category } from "@/modules/category/schemas/category.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  stockQuantity: number;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category | string;  // Tham chiếu đến Category

  @Prop({ default: true })
  isActive: boolean;  // Trạng thái sản phẩm (có bán hay không)
}

export const ProductSchema = SchemaFactory.createForClass(Product);
