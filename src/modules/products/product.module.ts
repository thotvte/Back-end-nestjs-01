import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductController } from "./product.controller"; 
import { ProductService } from "./product.service";  
import { Product, ProductSchema } from "./schemas/product.schema";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
        MulterModule.register({
              storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                  const filename = `${Date.now()}-${file.originalname}`;
                  cb(null, filename);
                },
                
              }),
            }),
            ServeStaticModule.forRoot({
              rootPath: join(__dirname, '..','..','..', 'uploads'),
              serveRoot: '/uploads',
            })
        
    ],
    controllers: [ProductController],  
    providers: [ProductService] 
})
export class ProductsModule {}
