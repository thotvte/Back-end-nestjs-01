import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./passport/local-auth.guard";
import { JwtAuthGuard } from "./passport/jwt-auth.guard";
import { Public, ResponseMessage } from "@/decorator/customize";
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  CreateAuthDto,
} from "./dto/create-auth.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { join } from "path";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post("login")
  @ResponseMessage("Fetch login")
  handleLogin(@Request() req) {
    // console.log('req.user:', req.user);
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post("register")
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Post("check-code")
  @Public()
  checkCode(@Body() codeDto: CodeAuthDto) {
    return this.authService.checkCode(codeDto);
  }

  @Post("retry-active")
  @Public()
  retryActive(@Body("email") email: string) {
    return this.authService.retryActive(email);
  }

  @Post("retry-password")
  @Public()
  retryPassword(@Body("email") email: string) {
    return this.authService.retryPassword(email);
  }

  @Post("change-password")
  @Public()
  changePassword(@Body() data: ChangePasswordAuthDto) {
    return this.authService.changePassword(data);
  }

  @Get("mail")
  @Public()
  testMail() {
    this.mailerService.sendMail({
      to: "gtet721@gmail.com", // list of receivers
      // from: "noreply@nestjs.com", // sender address
      subject: "Testing Nest MailerModule ✔", // Subject line
      text: "welcome", // plaintext body
      // html: "<b>Hello word Tho dep trai 1</b>", // HTML body content
      template: "register",
      context: {
        name: "THO",
        activationCode: 123456789,
      },
    });

    return "oke";
  }
}
