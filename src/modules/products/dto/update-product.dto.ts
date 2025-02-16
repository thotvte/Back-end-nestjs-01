import { Category } from "@/modules/category/schemas/category.schema";
import { Company } from "@/modules/company/schemas/company.schema";
import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
   @Transform(({ value }) => (typeof value === 'string' ? parseFloat(value) : value))
  price: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value))
  stockQuantity: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value))
  discount: number;

  image: string[];

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsMongoId({ message: "Category không hợp lệ" })
  category: string | Category; // Category có thể là ObjectId hoặc Category object

  @IsOptional()
  @IsMongoId({ message: "Company không hợp lệ" })
  company: string | Company;

  @IsOptional()
  color: string;
  
  @IsOptional()
  ram: string;

  @IsOptional()
  storageCapacity: string;

  @IsOptional()
  cpu: string;

  @IsOptional()
  gpu: string;

  @IsOptional()
  operatingSystem: string;

  @IsOptional()
  cpuSpeed :string;
  
  @IsOptional()
  cameraResolution:string

  @IsOptional()
  screenTechnology:string // công nghệ màn hình

  @IsOptional()
  screenResolution:string // độ phân giải màn hình 

  @IsOptional()
  widescreen:string // màn hình rộng

  @IsOptional()
  batteryCapacity: string // dung lương pin

  @IsOptional()
  maximumChargingSupport: string // hỗ trợ sạc tối đa 

  @IsOptional()
  design: string // thiết kế 

  @IsOptional()
  theLaunchTime: string; // thời gian ra mắt

  @IsOptional()
  material : string // chất liệu 

  @IsOptional()
  sizeAndVolume: string // kích thước và trọng lượng

  @IsOptional()
  @IsBoolean()
  isActive: boolean; // Trạng thái sản phẩm (có bán hay không)
}
