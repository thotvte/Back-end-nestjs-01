import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsString } from 'class-validator';

export class UpdateOrderDto {
    @IsString()
    status: string;  
}
