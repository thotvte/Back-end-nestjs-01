// src/libs/file-upload.config.ts
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';


// Cấu hình lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Trả về cấu hình MulterOptions
export const upload: MulterOptions = {
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }  // Tùy chọn giới hạn kích thước tệp (10MB)
};
