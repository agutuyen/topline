import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

export interface ProductDbRow {
  id: string;
  sku: string;
  collection_id: string;
  name_vi: string;
  name_en: string;
  category: string;
  category_label_vi: string | null;
  category_label_en: string | null;
  dimensions: string;
  dimensions_cm: string | null;
  materials_vi: string;
  materials_en: string;
  finish_vi: string;
  finish_en: string;
  color_vi: string | null;
  color_en: string | null;
  hardware_vi: string | null;
  hardware_en: string | null;
  design_style_vi: string | null;
  design_style_en: string | null;
  description_vi: string;
  description_en: string;
  image: string;
  cutout_image: string | null;
  collection_image: string | null;
  detail_image: string | null;
  gallery_images_json: string | null;
  tags: string | null;
  seo_keywords: string | null;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  url: string;
  caption?: string;
  isCover?: boolean;
}

function formatProduct(row: ProductDbRow) {
  const tags = row.tags
    ? row.tags
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean)
    : [];

  let galleryImages: GalleryItem[] = [];
  if (row.gallery_images_json) {
    try {
      galleryImages = JSON.parse(row.gallery_images_json);
    } catch {
      galleryImages = [];
    }
  }

  // If gallery is empty, automatically build default gallery from existing view fields
  if (galleryImages.length === 0 && row.image) {
    galleryImages.push({ url: row.image, caption: row.name_vi, isCover: true });
    if (row.cutout_image) {
      galleryImages.push({ url: row.cutout_image, caption: 'Bản vẽ tách nền kiến trúc', isCover: false });
    }
    if (row.collection_image) {
      galleryImages.push({ url: row.collection_image, caption: 'Phối cảnh không gian nội thất', isCover: false });
    }
    if (row.detail_image) {
      galleryImages.push({ url: row.detail_image, caption: 'Cận cảnh thớ gỗ & vật liệu đá', isCover: false });
    }
  }

  return {
    id: row.id,
    sku: row.sku,
    name: { vi: row.name_vi, en: row.name_en },
    category: row.category,
    categoryLabel: {
      vi: row.category_label_vi || row.category,
      en: row.category_label_en || row.category,
    },
    collectionId: row.collection_id,
    collectionName: {
      vi: row.category_label_vi || row.collection_id,
      en: row.category_label_en || row.collection_id,
    },
    dimensions: row.dimensions,
    dimensionsCm: row.dimensions_cm || undefined,
    materials: { vi: row.materials_vi, en: row.materials_en },
    finish: { vi: row.finish_vi, en: row.finish_en },
    color: row.color_vi ? { vi: row.color_vi, en: row.color_en || row.color_vi } : undefined,
    hardware: row.hardware_vi ? { vi: row.hardware_vi, en: row.hardware_en || row.hardware_vi } : undefined,
    designStyle: row.design_style_vi ? { vi: row.design_style_vi, en: row.design_style_en || row.design_style_vi } : undefined,
    description: { vi: row.description_vi, en: row.description_en },
    features: { vi: row.description_vi, en: row.description_en },
    image: row.image,
    cutoutImage: row.cutout_image || undefined,
    collectionImage: row.collection_image || undefined,
    detailImage: row.detail_image || undefined,
    galleryImages,
    tags,
    seoKeywords: row.seo_keywords || undefined,
    isPublished: Boolean(row.is_published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// GET /api/v1/products (Public with optional filters)
router.get('/', (req: Request, res: Response): void => {
  const { category, collectionId, search, status } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const params: (string | number)[] = [];

  if (category && typeof category === 'string' && category !== 'all') {
    query += ' AND (category = ? OR collection_id = ?)';
    params.push(category, category);
  }

  if (collectionId && typeof collectionId === 'string') {
    query += ' AND collection_id = ?';
    params.push(collectionId);
  }

  if (status === 'published') {
    query += ' AND is_published = 1';
  } else if (status === 'draft') {
    query += ' AND is_published = 0';
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = `%${search.trim().toLowerCase()}%`;
    query += ` AND (
      LOWER(sku) LIKE ? OR
      LOWER(name_vi) LIKE ? OR
      LOWER(name_en) LIKE ? OR
      LOWER(materials_vi) LIKE ? OR
      LOWER(materials_en) LIKE ? OR
      LOWER(tags) LIKE ?
    )`;
    params.push(q, q, q, q, q, q);
  }

  query += ' ORDER BY collection_id ASC, sku ASC';

  const rows = db.all<ProductDbRow>(query, params);
  const products = rows.map(formatProduct);

  res.json({
    success: true,
    data: products,
    total: products.length,
  });
});

// GET /api/v1/products/:id (Public)
router.get('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const row = db.get<ProductDbRow>('SELECT * FROM products WHERE id = ? OR LOWER(sku) = ?', [id, id.toLowerCase()]);

  if (!row) {
    res.status(404).json({ success: false, error: 'Không tìm thấy sản phẩm' });
    return;
  }

  res.json({ success: true, data: formatProduct(row) });
});

// POST /api/v1/products (Admin Only — Supports Multi-Image Gallery)
router.post('/', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const b = req.body;

  const sku = b.sku ? String(b.sku).trim() : '';
  const nameVi = b.name?.vi ?? b.name_vi ?? '';
  const nameEn = b.name?.en ?? b.name_en ?? '';
  const colId = b.collectionId ?? b.collection_id ?? b.category ?? 'warm-wood';

  if (!sku || !nameVi || !nameEn) {
    res.status(400).json({ success: false, error: 'Mã SKU và Tên sản phẩm (VI & EN) là bắt buộc' });
    return;
  }

  const id = b.id ? String(b.id).toLowerCase() : sku.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const existing = db.get<{ id: string }>('SELECT id FROM products WHERE id = ? OR sku = ?', [id, sku]);
  if (existing) {
    res.status(400).json({ success: false, error: `Sản phẩm với ID hoặc SKU ${sku} đã tồn tại` });
    return;
  }

  // Multi-image gallery handling
  let galleryJson: string | null = null;
  let image = b.image || '/images/products/TL-WW-01_Credenza_Cabinet.png';
  if (Array.isArray(b.galleryImages) && b.galleryImages.length > 0) {
    galleryJson = JSON.stringify(b.galleryImages);
    if (b.galleryImages[0].url) {
      image = b.galleryImages[0].url; // First image is primary cover photo
    }
  }

  const materialsVi = b.materials?.vi ?? b.materials_vi ?? 'Gỗ tự nhiên & đá cẩm thạch';
  const materialsEn = b.materials?.en ?? b.materials_en ?? 'Solid hardwood & natural stone';
  const finishVi = b.finish?.vi ?? b.finish_vi ?? 'Sơn PU mờ bảo vệ chống ẩm';
  const finishEn = b.finish?.en ?? b.finish_en ?? 'Matte polyurethane finish';
  const colorVi = b.color?.vi ?? b.color_vi ?? null;
  const colorEn = b.color?.en ?? b.color_en ?? null;
  const hardwareVi = b.hardware?.vi ?? b.hardware_vi ?? null;
  const hardwareEn = b.hardware?.en ?? b.hardware_en ?? null;
  const designStyleVi = b.designStyle?.vi ?? b.design_style_vi ?? null;
  const designStyleEn = b.designStyle?.en ?? b.design_style_en ?? null;
  const descVi = b.description?.vi ?? b.description_vi ?? nameVi;
  const descEn = b.description?.en ?? b.description_en ?? nameEn;
  const cutoutImage = b.cutoutImage ?? b.cutout_image ?? null;
  const collectionImage = b.collectionImage ?? b.collection_image ?? null;
  const detailImage = b.detailImage ?? b.detail_image ?? null;
  const dimensions = b.dimensions || 'Theo bản vẽ thiết kế';
  const dimensionsCm = b.dimensionsCm ?? b.dimensions_cm ?? null;
  const tagsStr = Array.isArray(b.tags) ? b.tags.join(', ') : b.tags || null;
  const isPublished = b.isPublished !== undefined ? (b.isPublished ? 1 : 0) : b.is_published !== undefined ? (b.is_published ? 1 : 0) : 1;

  db.run(
    `INSERT INTO products (
      id, sku, collection_id, name_vi, name_en, category, category_label_vi, category_label_en,
      dimensions, dimensions_cm, materials_vi, materials_en, finish_vi, finish_en,
      color_vi, color_en, hardware_vi, hardware_en, design_style_vi, design_style_en,
      description_vi, description_en, image, cutout_image, collection_image, detail_image,
      gallery_images_json, tags, seo_keywords, is_published
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )`,
    [
      id,
      sku,
      colId,
      nameVi,
      nameEn,
      colId,
      b.categoryLabel?.vi ?? b.category_label_vi ?? colId,
      b.categoryLabel?.en ?? b.category_label_en ?? colId,
      dimensions,
      dimensionsCm,
      materialsVi,
      materialsEn,
      finishVi,
      finishEn,
      colorVi,
      colorEn,
      hardwareVi,
      hardwareEn,
      designStyleVi,
      designStyleEn,
      descVi,
      descEn,
      image,
      cutoutImage,
      collectionImage,
      detailImage,
      galleryJson,
      tagsStr,
      b.seoKeywords ?? b.seo_keywords ?? null,
      isPublished,
    ]
  );

  const created = db.get<ProductDbRow>('SELECT * FROM products WHERE id = ?', [id]);
  res.status(201).json({ success: true, data: created ? formatProduct(created) : null });
});

// PUT /api/v1/products/:id (Admin Only — Full Support for Multi-Image Gallery & Auto Cover)
router.put('/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const b = req.body;

  const existing = db.get<ProductDbRow>('SELECT id, image FROM products WHERE id = ?', [id]);
  if (!existing) {
    res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    return;
  }

  // Multi-image gallery handling
  let galleryJson: string | null = null;
  let image = b.image ?? null;
  if (Array.isArray(b.galleryImages) && b.galleryImages.length > 0) {
    galleryJson = JSON.stringify(b.galleryImages);
    if (b.galleryImages[0].url) {
      image = b.galleryImages[0].url; // First image becomes primary cover photo
    }
  }

  const sku = b.sku ?? null;
  const colId = b.collectionId ?? b.collection_id ?? null;
  const nameVi = b.name?.vi ?? b.name_vi ?? null;
  const nameEn = b.name?.en ?? b.name_en ?? null;
  const categoryLabelVi = b.categoryLabel?.vi ?? b.category_label_vi ?? null;
  const categoryLabelEn = b.categoryLabel?.en ?? b.category_label_en ?? null;
  const dimensions = b.dimensions ?? null;
  const dimensionsCm = b.dimensionsCm ?? b.dimensions_cm ?? null;
  const materialsVi = b.materials?.vi ?? b.materials_vi ?? null;
  const materialsEn = b.materials?.en ?? b.materials_en ?? null;
  const finishVi = b.finish?.vi ?? b.finish_vi ?? null;
  const finishEn = b.finish?.en ?? b.finish_en ?? null;
  const colorVi = b.color?.vi ?? b.color_vi ?? null;
  const colorEn = b.color?.en ?? b.color_en ?? null;
  const hardwareVi = b.hardware?.vi ?? b.hardware_vi ?? null;
  const hardwareEn = b.hardware?.en ?? b.hardware_en ?? null;
  const designStyleVi = b.designStyle?.vi ?? b.design_style_vi ?? null;
  const designStyleEn = b.designStyle?.en ?? b.design_style_en ?? null;
  const descVi = b.description?.vi ?? b.description_vi ?? null;
  const descEn = b.description?.en ?? b.description_en ?? null;
  const cutoutImage = b.cutoutImage ?? b.cutout_image ?? null;
  const collectionImage = b.collectionImage ?? b.collection_image ?? null;
  const detailImage = b.detailImage ?? b.detail_image ?? null;
  const tagsStr = Array.isArray(b.tags) ? b.tags.join(', ') : b.tags ?? null;
  const isPublished =
    b.isPublished !== undefined
      ? b.isPublished
        ? 1
        : 0
      : b.is_published !== undefined
      ? b.is_published
        ? 1
        : 0
      : null;

  db.run(
    `UPDATE products SET
      sku = COALESCE(?, sku),
      collection_id = COALESCE(?, collection_id),
      category = COALESCE(?, category),
      name_vi = COALESCE(?, name_vi),
      name_en = COALESCE(?, name_en),
      category_label_vi = COALESCE(?, category_label_vi),
      category_label_en = COALESCE(?, category_label_en),
      dimensions = COALESCE(?, dimensions),
      dimensions_cm = COALESCE(?, dimensions_cm),
      materials_vi = COALESCE(?, materials_vi),
      materials_en = COALESCE(?, materials_en),
      finish_vi = COALESCE(?, finish_vi),
      finish_en = COALESCE(?, finish_en),
      color_vi = COALESCE(?, color_vi),
      color_en = COALESCE(?, color_en),
      hardware_vi = COALESCE(?, hardware_vi),
      hardware_en = COALESCE(?, hardware_en),
      design_style_vi = COALESCE(?, design_style_vi),
      design_style_en = COALESCE(?, design_style_en),
      description_vi = COALESCE(?, description_vi),
      description_en = COALESCE(?, description_en),
      image = COALESCE(?, image),
      cutout_image = COALESCE(?, cutout_image),
      collection_image = COALESCE(?, collection_image),
      detail_image = COALESCE(?, detail_image),
      gallery_images_json = COALESCE(?, gallery_images_json),
      tags = COALESCE(?, tags),
      is_published = COALESCE(?, is_published),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      sku,
      colId,
      colId,
      nameVi,
      nameEn,
      categoryLabelVi,
      categoryLabelEn,
      dimensions,
      dimensionsCm,
      materialsVi,
      materialsEn,
      finishVi,
      finishEn,
      colorVi,
      colorEn,
      hardwareVi,
      hardwareEn,
      designStyleVi,
      designStyleEn,
      descVi,
      descEn,
      image,
      cutoutImage,
      collectionImage,
      detailImage,
      galleryJson,
      tagsStr,
      isPublished,
      id,
    ]
  );

  const updated = db.get<ProductDbRow>('SELECT * FROM products WHERE id = ?', [id]);
  res.json({ success: true, data: updated ? formatProduct(updated) : null });
});

// DELETE /api/v1/products/:id (Admin Only)
router.delete('/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const result = db.run('DELETE FROM products WHERE id = ?', [id]);

  if (!result.changes) {
    res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    return;
  }

  res.json({ success: true, message: `Đã xóa sản phẩm ${id}` });
});

// PATCH /api/v1/products/:id/status (Admin Only)
router.patch('/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const { is_published, isPublished } = req.body;
  const status = isPublished !== undefined ? isPublished : is_published;

  const result = db.run('UPDATE products SET is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [
    status ? 1 : 0,
    id,
  ]);

  if (!result.changes) {
    res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    return;
  }

  res.json({ success: true, message: 'Cập nhật trạng thái hiển thị thành công' });
});

export default router;
