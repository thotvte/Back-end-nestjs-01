import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min, Max } from "class-validator";
import { Category } from "@/modules/category/schemas/category.schema";

export class CreateProductDto {
  @IsOptional()
  // @IsNotEmpty({ message: "Tên sản phẩm không được để trống" })
  @IsString()
  name: string;

  @IsOptional()
  // @IsNotEmpty({ message: "Mô tả sản phẩm không được để trống" })
  @IsString()
  description: string;

  @IsOptional()
  // @IsNotEmpty({ message: "Giá sản phẩm không được để trống" })
  @IsNumber()
  price: number;

  @IsOptional()
  // @IsNotEmpty({ message: "Số lượng tồn kho không được để trống" })
  @IsNumber()
  stockQuantity: number;

  // @IsOptional()
  // // @IsNotEmpty({ message: "Hình ảnh sản phẩm không được để trống" })
  // @IsString()
  // @IsUrl({}, { message: "URL hình ảnh không hợp lệ" })  // Kiểm tra xem image có phải là URL hợp lệ không
  // image: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: "Đánh giá phải lớn hơn hoặc bằng 1" })  // Kiểm tra giá trị min cho rating
  @Max(5, { message: "Đánh giá phải nhỏ hơn hoặc bằng 5" })  // Kiểm tra giá trị max cho rating
  rating?: number;  // Là optional

  // @IsOptional()
  // @IsMongoId({ message: "Category không hợp lệ" })
  // // @IsNotEmpty({ message: "Danh mục không được để trống" })
  // category: string | Category;  // Category có thể là ObjectId hoặc Category object

  @IsOptional()
  @IsBoolean()
  isActive: boolean;  // Trạng thái sản phẩm (có bán hay không)
}
