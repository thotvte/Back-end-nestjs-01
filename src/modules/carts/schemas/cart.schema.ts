import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop( [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
 }])
 products: { productId: mongoose.Types.ObjectId, quantity: number }[];


  @Prop({ default :0})
  totalAmount: number;

  // @Prop({ default: false })
  // isCheckedOut: boolean; 
}

export const CartSchema = SchemaFactory.createForClass(Cart);
