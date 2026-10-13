import { Router, Response } from 'express';
import { db } from '../db';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';
import { RfqDbRow } from './rfq.routes';

const router = Router();

// GET /api/v1/dashboard/stats (Admin Only)
router.get('/', requireAdmin, (_req: AuthenticatedRequest, res: Response): void => {
  const rfqStats = db.all<{ status: string; count: number }>(
    'SELECT status, COUNT(*) as count FROM rfqs GROUP BY status'
  );

  const statusMap: Record<string, number> = {
    pending: 0,
    reviewing: 0,
    quoted: 0,
    contracted: 0,
    rejected: 0,
  };

  let totalRfqs = 0;
  for (const row of rfqStats) {
    statusMap[row.status] = row.count;
    totalRfqs += row.count;
  }

  const prodStats = db.get<{ total: number; published: number }>(
    'SELECT COUNT(*) as total, SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) as published FROM products'
  ) || { total: 0, published: 0 };
  const contactStats = db.get<{ total: number; unread: number }>(
    "SELECT COUNT(*) as total, SUM(CASE WHEN status = 'unread' THEN 1 ELSE 0 END) as unread FROM contacts"
  ) || { total: 0, unread: 0 };

  const recentRfqs = db.all<RfqDbRow>(
    'SELECT id, tracking_code, full_name, company_name, project_type, status, created_at FROM rfqs ORDER BY created_at DESC LIMIT 5'
  );

  res.json({
    success: true,
    data: {
      rfqs: {
        total: totalRfqs,
        pending: statusMap.pending || 0,
        reviewing: statusMap.reviewing || 0,
        quoted: statusMap.quoted || 0,
        contracted: statusMap.contracted || 0,
        rejected: statusMap.rejected || 0,
      },
      products: {
        total: prodStats.total,
        published: prodStats.published,
      },
      contacts: {
        total: contactStats.total,
        unread: contactStats.unread,
      },
      recentRfqs: recentRfqs.map((r) => ({
        id: r.id,
        trackingCode: r.tracking_code,
        fullName: r.full_name,
        companyName: r.company_name || '',
        projectType: r.project_type,
        status: r.status,
        createdAt: r.created_at,
      })),
    },
  });
});

export default router;
