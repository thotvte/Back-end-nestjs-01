import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema },{ name: User.name, schema: UserSchema },{ name: Product.name, schema: ProductSchema }]),
    ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
