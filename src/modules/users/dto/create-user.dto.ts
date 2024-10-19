import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "Không được để trống name" })
  name: string;

  @IsNotEmpty({ message: "Không được để trống Email" })
  @IsEmail({}, { message: "Email không đúng định dạng" })
  email: string;

  @IsNotEmpty({ message: "Không được để trống Password" })
  password: string;

  phone: string;

  address: string;

  image: string;
}
