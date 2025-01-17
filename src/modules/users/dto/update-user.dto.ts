import { IsMongoId, isMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
  // @IsMongoId({ message: "_Id không hợp lệ" })
  // @IsNotEmpty({ message: "_Id không được để trống" })
  // _id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  image: string;
}
