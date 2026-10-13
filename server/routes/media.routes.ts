import { Router, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';
import { uploadProductImage } from '../middleware/upload';

const router = Router();

// POST /api/v1/media/upload (Admin Only)
router.post(
  '/upload',
  requireAdmin,
  uploadProductImage.array('images', 5),
  (req: AuthenticatedRequest, res: Response): void => {
    const files = (req.files as Express.Multer.File[]) || [];
    if (files.length === 0) {
      res.status(400).json({ success: false, error: 'Chưa có tệp hình ảnh nào được tải lên' });
      return;
    }

    const uploaded = files.map((f) => ({
      originalName: f.originalname,
      fileName: f.filename,
      url: `/uploads/products/${f.filename}`,
      size: f.size,
      mimetype: f.mimetype,
    }));

    res.status(201).json({
      success: true,
      data: uploaded,
      message: `Đã tải lên thành công ${uploaded.length} hình ảnh`,
    });
  }
);

// GET /api/v1/media (Admin Only - List assets)
router.get('/', requireAdmin, (_req: AuthenticatedRequest, res: Response): void => {
  const productsDir = path.resolve(process.cwd(), 'uploads/products');
  const files: { fileName: string; url: string; size: number; createdAt: string }[] = [];

  if (fs.existsSync(productsDir)) {
    const list = fs.readdirSync(productsDir);
    for (const name of list) {
      const fullPath = path.join(productsDir, name);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        files.push({
          fileName: name,
          url: `/uploads/products/${name}`,
          size: stat.size,
          createdAt: stat.birthtime.toISOString(),
        });
      }
    }
  }

  res.json({ success: true, data: files, total: files.length });
});

export default router;
