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
  sort_order: number;
  is_active: number;
}

function formatCollection(row: CollectionDbRow) {
  return {
    id: row.id,
    number: row.number,
    title: { vi: row.title_vi, en: row.title_en },
    subtitle: { vi: row.subtitle_vi || '', en: row.subtitle_en || '' },
    pieces: row.pieces_summary || '',
    overviewImage: row.overview_image || '',
    detailImage: row.detail_image || undefined,
    materialsSummary: row.materials_summary_vi
      ? { vi: row.materials_summary_vi, en: row.materials_summary_en || row.materials_summary_vi }
      : undefined,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

// GET /api/v1/collections
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
  const body = req.body;

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
      materials_summary_en = COALESCE(?, materials_summary_en)
    WHERE id = ?`,
    [
      body.title_vi ?? null,
      body.title_en ?? null,
      body.subtitle_vi ?? null,
      body.subtitle_en ?? null,
      body.pieces ?? null,
      body.overview_image ?? null,
      body.detail_image ?? null,
      body.materials_summary_vi ?? null,
      body.materials_summary_en ?? null,
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
