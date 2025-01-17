import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderItemDocument = HydratedDocument<OrderItem>;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: mongoose.Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop()
  unitPrice: number;  // Giá từng sản phẩm tại thời điểm mua

  @Prop()
  totalPrice: number;  // Tổng tiền cho sản phẩm này (quantity * unitPrice)
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
