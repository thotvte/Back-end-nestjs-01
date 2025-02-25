import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { query } from 'express';
import { Query } from 'mongoose';
import { Public } from '@/decorator/customize';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Req() req,@Body() createCartDto: CreateCartDto) {
    const userId = req.user._Id
    return this.cartsService.create({...createCartDto, user: userId });
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user._Id
    return this.cartsService.findAll(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
