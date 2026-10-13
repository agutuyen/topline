import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';

const UPLOAD_ROOT = path.resolve(process.cwd(), 'uploads');
const RFQ_DIR = path.join(UPLOAD_ROOT, 'rfq');
const PRODUCT_DIR = path.join(UPLOAD_ROOT, 'products');

for (const dir of [UPLOAD_ROOT, RFQ_DIR, PRODUCT_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const ALLOWED_EXTENSIONS = new Set([
  '.pdf',
  '.dwg',
  '.dxf',
  '.xlsx',
  '.xls',
  '.doc',
  '.docx',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
]);

function sanitizeFileName(origName: string): string {
  const ext = path.extname(origName).toLowerCase();
  const base = path
    .basename(origName, ext)
    .replace(/[^a-zA-Z0-9_\u0600-\u06FF\u0400-\u04FF\u00C0-\u024F\u1EA0-\u1EF9-]/g, '_')
    .substring(0, 50);
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${base}_${timestamp}_${randomSuffix}${ext}`;
}

const rfqStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, RFQ_DIR);
  },
  filename: (_req, file, cb) => {
    cb(null, sanitizeFileName(file.originalname));
  },
});

const productStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, PRODUCT_DIR);
  },
  filename: (_req, file, cb) => {
    cb(null, sanitizeFileName(file.originalname));
  },
});

export const uploadRfqFiles = multer({
  storage: rfqStorage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max per drawing
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.has(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Định dạng tệp không được hỗ trợ (${ext}). Chỉ chấp nhận PDF, DWG, DXF, XLSX, DOCX, PNG, JPG, WEBP.`));
    }
  },
});

export const uploadProductImage = multer({
  storage: productStorage,
  limits: {
    fileSize: 12 * 1024 * 1024, // 12MB max per image
    files: 5,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Chỉ chấp nhận tệp hình ảnh (.jpg, .jpeg, .png, .webp).`));
    }
  },
});
