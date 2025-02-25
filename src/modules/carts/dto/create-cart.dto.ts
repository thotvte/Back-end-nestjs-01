import { Prop } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";
export class CreateCartDto {
  user: mongoose.Types.ObjectId;

  @IsOptional()
   products: { productId: string, quantity: number }[];

   totalAmount: number;
}
