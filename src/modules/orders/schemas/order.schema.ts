import { User } from "@/modules/users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

   @Prop( [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      price: { type: Number, default: 0 }
   }])
   products: { productId: mongoose.Types.ObjectId, quantity: number ,price: number;}[];

  @Prop()
  totalAmount: number;

  @Prop({ enum: ['CHỜ XÁC NHẬN', 'ĐÃ XÁC NHẬN','ĐANG VẬN CHUYỂN', 'HOÀN THÀNH', 'BỊ HỦY BỎ'], default: 'CHỜ XÁC NHẬN' })
  status: string;  

  @Prop()
  shippingAddress: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);



