import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';  // Use Transform for automatic type conversion
import { Category } from '@/modules/category/schemas/category.schema';
import { Company } from '@/modules/company/schemas/company.schema';

export class CreateProductDto {
 
  @IsOptional()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Mô tả sản phẩm không được để trống' })
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @IsNumber()
  @Transform(({ value }) => (typeof value === 'string' ? parseFloat(value) : value)) // Transform string to number
  price: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Số lượng tồn kho không được để trống' })
  @IsNumber()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value)) // Transform string to number
  stockQuantity: number;

  image: string[];

  @IsOptional()
  @IsMongoId({ message: 'Category không hợp lệ' })
  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  category: string | Category;

  @IsOptional()
  @IsMongoId({ message: 'Company không hợp lệ' })
  @IsNotEmpty({ message: 'Company không được để trống' })
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
  @IsNumber()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value, 10) : value))
  discount: number;

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
  isActive: boolean;
}
