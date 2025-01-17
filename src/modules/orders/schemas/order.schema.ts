import { User } from "@/modules/users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  payment: mongoose.Types.ObjectId;

  @Prop()
  totalAmount: number;

  @Prop({ enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' })
  status: string;  // Trạng thái đơn hàng

  @Prop()
  shippingAddress: string;

  @Prop()
  shippingMethod: string;

  @Prop()
  deliveryDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);



