import { IsOptional } from "class-validator";

export class UpdateCartDto   {
   @IsOptional()
      products: { productId: string, quantity: number }[];
}
