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
  tags: string | null;
  seo_keywords: string | null;
  is_published: number;
  created_at: string;
  updated_at: string;
}

function formatProduct(row: ProductDbRow) {
  const tags = row.tags
    ? row.tags
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean)
    : [];

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

// POST /api/v1/products (Admin Only)
router.post('/', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const body = req.body;

  if (!body.sku || !body.name_vi || !body.name_en || !body.collection_id) {
    res.status(400).json({ success: false, error: 'Mã SKU, tên sản phẩm (VI & EN) và bộ sưu tập là bắt buộc' });
    return;
  }

  const id = body.id ? String(body.id).toLowerCase() : String(body.sku).toLowerCase().replace(/[^a-z0-9]/g, '-');

  const existing = db.get<{ id: string }>('SELECT id FROM products WHERE id = ? OR sku = ?', [id, body.sku]);
  if (existing) {
    res.status(400).json({ success: false, error: `Sản phẩm với ID hoặc SKU ${body.sku} đã tồn tại` });
    return;
  }

  db.run(
    `INSERT INTO products (
      id, sku, collection_id, name_vi, name_en, category, category_label_vi, category_label_en,
      dimensions, dimensions_cm, materials_vi, materials_en, finish_vi, finish_en,
      color_vi, color_en, hardware_vi, hardware_en, design_style_vi, design_style_en,
      description_vi, description_en, image, cutout_image, collection_image, detail_image,
      tags, seo_keywords, is_published
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?
    )`,
    [
      id,
      body.sku,
      body.collection_id,
      body.name_vi,
      body.name_en,
      body.category || body.collection_id,
      body.category_label_vi || null,
      body.category_label_en || null,
      body.dimensions || 'Theo yêu cầu bản vẽ',
      body.dimensions_cm || null,
      body.materials_vi || 'Gỗ tự nhiên & đá cẩm thạch',
      body.materials_en || 'Natural hardwood & stone',
      body.finish_vi || 'Sơn PU mờ cao cấp',
      body.finish_en || 'Matte polyurethane finish',
      body.color_vi || null,
      body.color_en || null,
      body.hardware_vi || null,
      body.hardware_en || null,
      body.design_style_vi || null,
      body.design_style_en || null,
      body.description_vi || body.name_vi,
      body.description_en || body.name_en,
      body.image || '/images/products/placeholder.png',
      body.cutout_image || null,
      body.collection_image || null,
      body.detail_image || null,
      Array.isArray(body.tags) ? body.tags.join(', ') : body.tags || null,
      body.seo_keywords || null,
      body.is_published !== undefined ? (body.is_published ? 1 : 0) : 1,
    ]
  );

  const created = db.get<ProductDbRow>('SELECT * FROM products WHERE id = ?', [id]);
  res.status(201).json({ success: true, data: created ? formatProduct(created) : null });
});

// PUT /api/v1/products/:id (Admin Only)
router.put('/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const body = req.body;

  const existing = db.get<ProductDbRow>('SELECT id FROM products WHERE id = ?', [id]);
  if (!existing) {
    res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    return;
  }

  db.run(
    `UPDATE products SET
      sku = COALESCE(?, sku),
      collection_id = COALESCE(?, collection_id),
      name_vi = COALESCE(?, name_vi),
      name_en = COALESCE(?, name_en),
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
      tags = COALESCE(?, tags),
      is_published = COALESCE(?, is_published),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      body.sku ?? null,
      body.collection_id ?? null,
      body.name_vi ?? null,
      body.name_en ?? null,
      body.dimensions ?? null,
      body.dimensions_cm ?? null,
      body.materials_vi ?? null,
      body.materials_en ?? null,
      body.finish_vi ?? null,
      body.finish_en ?? null,
      body.color_vi ?? null,
      body.color_en ?? null,
      body.hardware_vi ?? null,
      body.hardware_en ?? null,
      body.design_style_vi ?? null,
      body.design_style_en ?? null,
      body.description_vi ?? null,
      body.description_en ?? null,
      body.image ?? null,
      body.cutout_image ?? null,
      body.collection_image ?? null,
      body.detail_image ?? null,
      Array.isArray(body.tags) ? body.tags.join(', ') : body.tags ?? null,
      body.is_published !== undefined ? (body.is_published ? 1 : 0) : null,
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
  const { is_published } = req.body;

  const result = db.run('UPDATE products SET is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [
    is_published ? 1 : 0,
    id,
  ]);

  if (!result.changes) {
    res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    return;
  }

  res.json({ success: true, message: 'Cập nhật trạng thái hiển thị thành công' });
});

export default router;
