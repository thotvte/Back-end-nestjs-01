import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "./schemas/company.schema";
import { Model } from "mongoose";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyModel.create(createCompanyDto);
    return {
      _id: company.id,
      name: company.name,
    };
  }

  async findAll() {
    const results = await this.companyModel.find()
    return {
      results,
    };
  }

  findOne(id: string) {
    return this.companyModel.findById(id)
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const category = await this.companyModel.findByIdAndUpdate(id, updateCompanyDto);
    return category
  }

  async remove(id: string) {
    const category =  await this.companyModel.findByIdAndDelete(id)
        if(!category){
          throw new NotFoundException(`Không tìm thấy Company với id: ${id}`);
        }
    
        await this.companyModel.deleteOne({_id:id})
        return { message: `Company với id ${id} đã bị xóa` };
  }
}
