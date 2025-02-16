  import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    UseInterceptors,
    UploadedFile,
    Bind,
    BadRequestException,
    UploadedFiles,
  } from "@nestjs/common";
  import { ProductService } from "./product.service";
  import { CreateProductDto } from "./dto/create-product.dto";
  import { UpdateProductDto } from "./dto/update-product.dto";
  import { FilesInterceptor } from "@nestjs/platform-express";
import { Public } from "@/decorator/customize";

  @Controller("products")
  export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FilesInterceptor("image", 10))
    async create(
      @Body() createProductDto: CreateProductDto,
      @UploadedFiles() files: Express.Multer.File[], 
    ) {
      const newProduct = await this.productService.create(
        createProductDto,
        files,
      );
      return { message: "Product added successfully", product: newProduct };
    }

    // @Public()
    // @Get()
    // findAll(@Query() query: string) {
    //   return this.productService.findHome(query);
    // }
    @Public()
    @Get()
    findAll(@Query() query: any) {
      const current = query.current || 1; // Default current page is 1
      const pageSize = query.pageSize || 24; // Default pageSize is 24
      return this.productService.findHome(query, current, pageSize);
    }
    
    @Public()
    @Get(":id")
    findOne(@Param("id") id: string) {
      return this.productService.findOne(id);
    }

    @Public()
    @Get("categories/:id")
    findCategory(@Param("id") id: string) {
      return this.productService.findCategory(id);
    }

    @Put(":id")
    @UseInterceptors(FilesInterceptor("image", 10))
    async update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files: Express.Multer.File[], ) {
      return await this.productService.update(id, updateProductDto,files);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
      return this.productService.remove(id);
    }
  }
