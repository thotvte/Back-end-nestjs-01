import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './schemas/order-item.schema';

@Module({

  imports: [
      MongooseModule.forFeature([{ name: OrderItem.name, schema: OrderItemSchema }]),
    ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
