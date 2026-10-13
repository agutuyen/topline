import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

export interface MillworkProjectDbRow {
  id: string;
  client: string;
  badge_vi: string | null;
  badge_en: string | null;
  title_vi: string;
  title_en: string;
  desc_vi: string | null;
  desc_en: string | null;
  scope_vi: string | null;
  scope_en: string | null;
  materials_vi: string | null;
  materials_en: string | null;
  standards_vi: string | null;
  standards_en: string | null;
  image: string;
  gallery_images_json: string | null;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface CommercialClientDbRow {
  id: number;
  name: string;
  role: string;
  logo_text: string;
  sort_order: number;
}

function formatMillworkProject(row: MillworkProjectDbRow) {
  let galleryImages: { url: string; caption: { vi: string; en: string } }[] = [];
  if (row.gallery_images_json) {
    try {
      galleryImages = JSON.parse(row.gallery_images_json);
    } catch {
      galleryImages = [];
    }
  }

  // Ensure primary image is first if gallery is empty
  if (galleryImages.length === 0 && row.image) {
    galleryImages.push({
      url: row.image,
      caption: { vi: row.title_vi, en: row.title_en },
    });
  }

  return {
    id: row.id,
    client: row.client,
    badge: {
      vi: row.badge_vi || 'MỘC KIẾN TRÚC',
      en: row.badge_en || 'ARCHITECTURAL MILLWORK',
    },
    title: { vi: row.title_vi, en: row.title_en },
    desc: { vi: row.desc_vi || '', en: row.desc_en || '' },
    scope: { vi: row.scope_vi || '', en: row.scope_en || '' },
    materials: { vi: row.materials_vi || '', en: row.materials_en || '' },
    standards: { vi: row.standards_vi || '', en: row.standards_en || '' },
    image: row.image,
    galleryImages,
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// GET /api/v1/millwork (Public)
router.get('/', (_req: Request, res: Response): void => {
  const rows = db.all<MillworkProjectDbRow>(
    'SELECT * FROM millwork_projects WHERE is_active = 1 ORDER BY sort_order ASC'
  );
  res.json({
    success: true,
    data: rows.map(formatMillworkProject),
    total: rows.length,
  });
});

// GET /api/v1/millwork/clients (Public)
router.get('/clients', (_req: Request, res: Response): void => {
  const rows = db.all<CommercialClientDbRow>(
    'SELECT * FROM commercial_clients ORDER BY sort_order ASC'
  );
  res.json({
    success: true,
    data: rows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.role,
      logoText: r.logo_text,
    })),
    total: rows.length,
  });
});

// GET /api/v1/millwork/:id (Public / Admin)
router.get('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const row = db.get<MillworkProjectDbRow>(
    'SELECT * FROM millwork_projects WHERE id = ?',
    [id]
  );
  if (!row) {
    res.status(404).json({ success: false, error: 'Không tìm thấy dự án' });
    return;
  }
  res.json({ success: true, data: formatMillworkProject(row) });
});

// PUT /api/v1/millwork/:id (Admin Only — Full Support for Multi-Images)
router.put('/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const b = req.body;

  const existing = db.get<MillworkProjectDbRow>(
    'SELECT id, image FROM millwork_projects WHERE id = ?',
    [id]
  );
  if (!existing) {
    res.status(404).json({ success: false, error: 'Dự án không tồn tại' });
    return;
  }

  let galleryJson: string | null = null;
  let primaryImage = b.image ?? null;

  if (Array.isArray(b.galleryImages)) {
    galleryJson = JSON.stringify(b.galleryImages);
    // If multiple images provided, first image is primary cover photo
    if (b.galleryImages.length > 0 && b.galleryImages[0].url) {
      primaryImage = b.galleryImages[0].url;
    }
  }

  const client = b.client ?? null;
  const badgeVi = b.badge?.vi ?? b.badge_vi ?? null;
  const badgeEn = b.badge?.en ?? b.badge_en ?? null;
  const titleVi = b.title?.vi ?? b.title_vi ?? null;
  const titleEn = b.title?.en ?? b.title_en ?? null;
  const descVi = b.desc?.vi ?? b.desc_vi ?? null;
  const descEn = b.desc?.en ?? b.desc_en ?? null;
  const scopeVi = b.scope?.vi ?? b.scope_vi ?? null;
  const scopeEn = b.scope?.en ?? b.scope_en ?? null;
  const matVi = b.materials?.vi ?? b.materials_vi ?? null;
  const matEn = b.materials?.en ?? b.materials_en ?? null;
  const stdVi = b.standards?.vi ?? b.standards_vi ?? null;
  const stdEn = b.standards?.en ?? b.standards_en ?? null;

  db.run(
    `UPDATE millwork_projects SET
      client = COALESCE(?, client),
      badge_vi = COALESCE(?, badge_vi),
      badge_en = COALESCE(?, badge_en),
      title_vi = COALESCE(?, title_vi),
      title_en = COALESCE(?, title_en),
      desc_vi = COALESCE(?, desc_vi),
      desc_en = COALESCE(?, desc_en),
      scope_vi = COALESCE(?, scope_vi),
      scope_en = COALESCE(?, scope_en),
      materials_vi = COALESCE(?, materials_vi),
      materials_en = COALESCE(?, materials_en),
      standards_vi = COALESCE(?, standards_vi),
      standards_en = COALESCE(?, standards_en),
      image = COALESCE(?, image),
      gallery_images_json = COALESCE(?, gallery_images_json),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      client,
      badgeVi,
      badgeEn,
      titleVi,
      titleEn,
      descVi,
      descEn,
      scopeVi,
      scopeEn,
      matVi,
      matEn,
      stdVi,
      stdEn,
      primaryImage,
      galleryJson,
      id,
    ]
  );

  const updated = db.get<MillworkProjectDbRow>(
    'SELECT * FROM millwork_projects WHERE id = ?',
    [id]
  );
  res.json({
    success: true,
    data: updated ? formatMillworkProject(updated) : null,
    message: 'Cập nhật dự án mộc kiến trúc thành công',
  });
});

export default router;
