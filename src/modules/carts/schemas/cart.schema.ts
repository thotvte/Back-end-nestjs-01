import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
  products: mongoose.Types.ObjectId[];

  @Prop()
  totalAmount: number;

  @Prop({ default: false })
  isCheckedOut: boolean;  // Trạng thái giỏ hàng (đã thanh toán hay chưa)
}

export const CartSchema = SchemaFactory.createForClass(Cart);
