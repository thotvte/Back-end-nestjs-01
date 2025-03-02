import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  Res,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { query } from "express";
import { Sign } from "crypto";
import { Public } from "@/decorator/customize";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(">> check createUserDto: ", createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  async findAll(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.usersService.findAll(query, +current, +pageSize);
  }

  @Get("profile/me")
  async me(@Req()req) {
    console.log(req.user)
    const userId = req.user._Id; // Giả sử _id được lưu trong token của người dùng
    return this.usersService.isMe(userId);  // Gọi service để lấy thông tin người dùng
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Put("")
  update(@Req() req,@Body() updateUserDto: UpdateUserDto) {
    const userId = req.user._Id
    // console.log(userId)
    return this.usersService.update(userId,updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
