import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsMongoId()
  user: string;

  @IsArray()
  products: { productId: string, quantity: number,price: number; }[];

  totalAmount: number;

  shippingAddress: string;
}
