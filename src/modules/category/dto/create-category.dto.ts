import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsOptional()
  @IsNotEmpty({ message: "Tên danh mục không được để trống" })
  @IsString()
  name: string;
}
