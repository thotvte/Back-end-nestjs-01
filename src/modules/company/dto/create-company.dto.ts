import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsOptional()
  @IsNotEmpty({ message: "Tên hãng không được để trống" })
  @IsString()
  name: string;
}
