import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { FileUploadService } from './file-upload.service';
  
  @Controller('file-upload')
  export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
    //   return this.fileUploadService.handleFileUpload(file);
    // return { filePath: `/uploads/${file.filename}` };
    console.log('file:',file)
    return console.log(`http://localhost:8080/api/v1/uploads/`+ file.filename)
    }
  }