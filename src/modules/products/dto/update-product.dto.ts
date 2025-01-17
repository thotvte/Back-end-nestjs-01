import { IsMongoId, IsOptional, IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  stockQuantity: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  rating: number;


  @IsOptional()
  @IsBoolean()
  isActive: boolean;  // Trạng thái sản phẩm (có bán hay không)
}
