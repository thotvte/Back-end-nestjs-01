import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'dns';

@Injectable()
export class CategoryService {
  constructor(
      @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.create(createCategoryDto);
    return{
      _id:category.id,
      name:category.name
    }
  }

  async findAll() {
    const results = await this.categoryModel.find()
  return {
    results,
  };
  }

  findOne(id: number) {
    return this.categoryModel.findById(id)
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
    return category
    
  }

  async remove(id: string) {
   const category =  await this.categoryModel.findByIdAndDelete(id)
    if(!category){
      throw new NotFoundException(`Không tìm thấy Category với id: ${id}`);
    }

    await this.categoryModel.deleteOne({_id:id})
    return { message: `Category với id ${id} đã bị xóa` };
  }
}
