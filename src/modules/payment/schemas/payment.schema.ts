import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: mongoose.Types.ObjectId;

  @Prop()
  amount: number;

  @Prop({ enum: ['CREDIT_CARD', 'PAYPAL', 'COD'], default: 'COD' })
  method: string;  // Phương thức thanh toán

  @Prop({ enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' })
  status: string;  // Trạng thái thanh toán

  @Prop()
  transactionId: string;  // Mã giao dịch

  @Prop()
  paymentDate: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
