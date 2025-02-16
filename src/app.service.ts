import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  static getMulterStorage(): any {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }

  // Cấu hình Multer để lưu file
  getMulterStorage() {
    return diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Chỉ định thư mục lưu file
      },
      filename: (req, file, cb) => {
        // Đặt tên file bằng UUID để tránh trùng
        const filename = `${uuidv4()}${extname(file.originalname)}`;
        console.log("Tệp đã được lưu với tên:", filename); // Kiểm tra tên file
        cb(null, filename); // Đặt tên file đã được chuyển đổi
      },
    });
  }
  
}
