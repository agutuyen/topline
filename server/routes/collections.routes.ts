import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

interface CollectionDbRow {
  id: string;
  number: string;
  title_vi: string;
  title_en: string;
  subtitle_vi: string | null;
  subtitle_en: string | null;
  pieces_summary: string | null;
  overview_image: string | null;
  detail_image: string | null;
  materials_summary_vi: string | null;
  materials_summary_en: string | null;
  gallery_images_json: string | null;
  sort_order: number;
  is_active: number;
}

function formatCollection(row: CollectionDbRow) {
  let galleryImages: { url: string; caption?: string }[] = [];
  if (row.gallery_images_json) {
    try {
      galleryImages = JSON.parse(row.gallery_images_json);
    } catch {
      galleryImages = [];
    }
  }

  if (galleryImages.length === 0 && row.overview_image) {
    galleryImages.push({ url: row.overview_image, caption: row.title_vi });
    if (row.detail_image) {
      galleryImages.push({ url: row.detail_image, caption: 'Mẫu vật liệu tuyển chọn' });
    }
  }

  return {
    id: row.id,
    number: row.number,
    title: { vi: row.title_vi, en: row.title_en },
    subtitle: { vi: row.subtitle_vi || '', en: row.subtitle_en || '' },
    pieces: row.pieces_summary || '',
    overviewImage: row.overview_image || '',
    detailImage: row.detail_image || undefined,
    galleryImages,
    materialsSummary: row.materials_summary_vi
      ? { vi: row.materials_summary_vi, en: row.materials_summary_en || row.materials_summary_vi }
      : undefined,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

// GET /api/v1/collections (Public)
router.get('/', (_req: Request, res: Response): void => {
  const rows = db.all<CollectionDbRow>('SELECT * FROM collections WHERE is_active = 1 ORDER BY sort_order ASC');
  res.json({
    success: true,
    data: rows.map(formatCollection),
  });
});

// PUT /api/v1/collections/:id (Admin only)
router.put('/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const b = req.body;

  let galleryJson: string | null = null;
  let overviewImage = b.overviewImage ?? b.overview_image ?? null;
  if (Array.isArray(b.galleryImages) && b.galleryImages.length > 0) {
    galleryJson = JSON.stringify(b.galleryImages);
    if (b.galleryImages[0].url) {
      overviewImage = b.galleryImages[0].url; // First image is primary cover photo
    }
  }

  const titleVi = b.title?.vi ?? b.title_vi ?? null;
  const titleEn = b.title?.en ?? b.title_en ?? null;
  const subtitleVi = b.subtitle?.vi ?? b.subtitle_vi ?? null;
  const subtitleEn = b.subtitle?.en ?? b.subtitle_en ?? null;
  const pieces = b.pieces ?? b.pieces_summary ?? null;
  const detailImage = b.detailImage ?? b.detail_image ?? null;
  const materialsSummaryVi = b.materialsSummary?.vi ?? b.materials_summary_vi ?? null;
  const materialsSummaryEn = b.materialsSummary?.en ?? b.materials_summary_en ?? null;

  const result = db.run(
    `UPDATE collections SET
      title_vi = COALESCE(?, title_vi),
      title_en = COALESCE(?, title_en),
      subtitle_vi = COALESCE(?, subtitle_vi),
      subtitle_en = COALESCE(?, subtitle_en),
      pieces_summary = COALESCE(?, pieces_summary),
      overview_image = COALESCE(?, overview_image),
      detail_image = COALESCE(?, detail_image),
      materials_summary_vi = COALESCE(?, materials_summary_vi),
      materials_summary_en = COALESCE(?, materials_summary_en),
      gallery_images_json = COALESCE(?, gallery_images_json)
    WHERE id = ?`,
    [
      titleVi,
      titleEn,
      subtitleVi,
      subtitleEn,
      pieces,
      overviewImage,
      detailImage,
      materialsSummaryVi,
      materialsSummaryEn,
      galleryJson,
      id,
    ]
  );

  if (!result.changes) {
    res.status(404).json({ success: false, error: 'Bộ sưu tập không tồn tại' });
    return;
  }

  const updated = db.get<CollectionDbRow>('SELECT * FROM collections WHERE id = ?', [id]);
  res.json({ success: true, data: updated ? formatCollection(updated) : null });
});

export default router;
