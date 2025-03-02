import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schemas/order.schema";
import { User, UserSchema } from "../users/schemas/user.schema";
import { Product, ProductSchema } from "../products/schemas/product.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema },{ name: User.name, schema: UserSchema },{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
