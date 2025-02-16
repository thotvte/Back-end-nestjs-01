import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { UsersModule } from "@/modules/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewsModule } from "@/modules/reviews/reviews.module";
import { OrdersModule } from "@/modules/orders/orders.module";

import { AuthModule } from "@/auth/auth.module";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/passport/jwt-auth.guard";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { TransformInterceptor } from "./core/transform.interceptor";
import { RolesModule } from "./modules/roles/roles.module";
import { CartsModule } from "./modules/carts/carts.module";
import { CategoryModule } from "./modules/category/category.module";
import { OrderItemModule } from "./modules/order-item/order-item.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ProductsModule } from "./modules/products/product.module";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadModule } from "./modules/file-upload/file-upload.module";
import { CompanyModule } from "./modules/company/company.module";

@Module({
  imports: [
    UsersModule,
    ReviewsModule,
    OrdersModule,
    AuthModule,
    RolesModule,
    CartsModule,
    CategoryModule,
    OrderItemModule,
    PaymentModule,
    ProductsModule,
    FileUploadModule,
    CompanyModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      storage: diskStorage({
        destination: '../uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>("MAIL_USER"),
            pass: configService.get<string>("MAIL_PASSWORD"),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + "/src/mail/templates/",
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
