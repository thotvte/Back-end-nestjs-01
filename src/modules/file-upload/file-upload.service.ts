import { BadRequestException, Injectable } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileUploadService {
  handleFileUpload(file: Express.Multer.File) {
  
    // const filename = `${Date.now()}${extname(file.filename)}`;
    // console.log(filename)
    // const filePath = `/uploads/${filename}`;

    // Lưu tệp vào thư mục uploads (hoặc thư mục bạn muốn lưu)
    // const fileDestination = `./uploads/${filename}`;

    return { filePath: `/uploads/${file.filename}` };
    // Lưu tệp vào đĩa cứng hoặc xử lý như mong muốn
    // Lưu tệp vào thư mục upload (tùy thuộc vào cấu hình của Multer)

    // return { filePath };  // Trả về đường dẫn tệp đã được lưu
  }


  handleFileUploadSave(file: Express.Multer.File) {
  
    const filename = `${Date.now()}${extname(file.originalname)}`;
    const filePath = `/uploads/${filename}`;

    // Lưu tệp vào thư mục uploads (hoặc thư mục bạn muốn lưu)
    const fileDestination = `./uploads/${filename}`;

    // Lưu tệp vào đĩa cứng hoặc xử lý như mong muốn
    // Lưu tệp vào thư mục upload (tùy thuộc vào cấu hình của Multer)

    return { fileDestination };  // Trả về đường dẫn tệp đã được lưu
  }
  
  }

