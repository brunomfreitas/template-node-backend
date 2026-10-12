import fs from 'fs';
import multer from 'multer';
import path from 'path';

const uploadDir = path.resolve('tmp/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowed = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Arquivo inválido'));
    }

    cb(null, true);
  },
});