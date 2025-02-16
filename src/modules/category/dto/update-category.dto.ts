import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
