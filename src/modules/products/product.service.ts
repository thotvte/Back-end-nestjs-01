import { Injectable, BadRequestException, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import aqp from "api-query-params";
import mongoose from 'mongoose';
import { extname } from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async isProductExist(name: string): Promise<boolean> {
    const product = await this.productModel.exists({ name });
    return !!product;
  }

  async create(createProductDto: CreateProductDto, file: Express.Multer.File[]) {
    const { name } = createProductDto;
    const isExist = await this.isProductExist(name);
    if (isExist) {
      throw new BadRequestException(`Sản phẩm với tên "${name}" đã tồn tại.`);
    }
    const imageUrls = file.map(file => `http://localhost:8080/uploads/${file.filename}`);
  
    const product = await this.productModel.create({
      image: imageUrls, 
      ...createProductDto
    });
    
    return product
  }
  
  async findHome(query: string, current: number= 1 , pageSize: number = 24) {
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

  

  async findOne(id: string): Promise<Product> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không đúng định dạng MongoDB');
    }

    const product = await this.productModel.findOne({ _id: id }).populate('category').populate('company'); ;
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với id: ${id}`);
    }
    

    return product;
  }

  async findCategory(id: string) {
    

    const products = await this.productModel.find({ category : id });
    if (products.length === 0) {
      throw new NotFoundException(`Không tìm thấy sản phẩm trong category: ${id}`);
    }
    

    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto, file: Express.Multer.File[]) {
    const updateId = await this.productModel.findById(id);
    
    if (!updateId) {
      throw new BadRequestException(`Sản phẩm không tồn tại `);
    }
    let imageUrls: string[] = updateId.image;
    if (file &&file.length > 0) {
        imageUrls = file.map(file => `http://localhost:8080/uploads/${file.filename}`);
    } else {
        imageUrls = updateId.image;  
    }

    const product = await this.productModel.findByIdAndUpdate(
      id, 
      {
        ...updateProductDto
      },
      { new: true }  
    );
    
    return product
}

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
