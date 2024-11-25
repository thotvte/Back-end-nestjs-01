import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { hashPasswordHelper } from "@/helpers/util";
import aqp from "api-query-params";
import mongoose from "mongoose";
import { promises } from "dns";
import { CodeAuthDto, CreateAuthDto } from "@/auth/dto/create-auth.dto";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email: email });
    if (user) {
      return true;
    }
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email đã tồn tại : ${email}. Vui lòng sữ dụng Email khác !`,
      );
    }
    const hashPassword = await hashPasswordHelper(createUserDto.password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });
    return {
      _id: user.id,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select("-password")
      .sort(sort as any);

    return { results, totalPages };
  }

  async findOne(id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException("Id không đúng định dạng MongoDB");
    }
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với id: ${id}`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.userModel.deleteOne({ _id });
    } else {
      throw new BadRequestException("Id không đúng định dạng mongoDB");
    }
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email đã tồn tại : ${email}. Vui lòng sữ dụng Email khác !`,
      );
    }
    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      // codeExpired: dayjs().add(5, "minutes"),
      codeExpired: dayjs().add(30, "second"),
    });

    //send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: "Activate your account at @THODEPTRAI ✔", // Subject line
      template: "register",
      context: {
        name: user.name ?? user.email,
        activationCode: codeId,
      },
    });
    return {
      _id: user.id,
    };
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      _id: data._id,
      codeId: data.code,
    });
    if (!user) {
      throw new BadRequestException("Mã code không hợp lệ hoặc hết thời gian");
    }
    //check expire
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      //
      await this.userModel.updateOne(
        { _id: data._id },
        {
          isActive: true,
        },
      );
    } else {
      throw new BadRequestException("Mã code đã hết hạn !");
    }
    return { isBeforeCheck };
  }
}
