// src/products/product.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import aqp from "api-query-params";
import mongoose from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Kiểm tra sản phẩm có tồn tại không
  async isProductExist(name: string): Promise<boolean> {
    const product = await this.productModel.exists({ name });
    return !!product;
  }

  // Tạo sản phẩm mới
  async create(createProductDto: CreateProductDto) {
    const { name, description, price, stockQuantity } = createProductDto;

    const isExist = await this.isProductExist(name);
    if (isExist) {
      throw new BadRequestException(`Sản phẩm với tên "${name}" đã tồn tại.`);
    }

    const product = await this.productModel.create({
      name,
      description,
      price,
      stockQuantity,
  
    });

    return {
      _id: product.id,
      name: product.name,
    };
  }

  // Lấy tất cả sản phẩm
  async findAll(query: string, current: number = 1, pageSize: number = 10) {
    const { filter, sort } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    const totalItems = (await this.productModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.productModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);

    return {
      meta: {
        current,
        pageSize,
        totalPages,
        totalItems,
      },
      results,
    };
  }

  // Tìm sản phẩm theo ID
  async findOne(id: string): Promise<Product> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không đúng định dạng MongoDB');
    }

    const product = await this.productModel.findOne({ _id: id }).populate('category');
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với id: ${id}`);
    }

    return product;
  }

  // Cập nhật sản phẩm
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findOneAndUpdate(
      { _id: id },
      { ...updateProductDto },
      { new: true },
    );

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với id: ${id}`);
    }

    return product;
  }

  // Xóa sản phẩm
  async remove(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không đúng định dạng MongoDB');
    }

    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với id: ${id}`);
    }

    await this.productModel.deleteOne({ _id: id });

    return { message: `Sản phẩm với id ${id} đã bị xóa` };
  }
}
