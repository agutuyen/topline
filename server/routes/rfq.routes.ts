import { Router, Request, Response } from 'express';
import crypto from 'node:crypto';
import { db } from '../db';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';
import { rfqLimiter } from '../middleware/rateLimit';
import { uploadRfqFiles } from '../middleware/upload';

const router = Router();

export interface RfqDbRow {
  id: string;
  tracking_code: string;
  full_name: string;
  phone: string;
  email: string;
  company_name: string | null;
  project_type: string | null;
  notes: string | null;
  selected_products_json: string | null;
  status: string;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface RfqAttachmentDbRow {
  id: number;
  rfq_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string | null;
  created_at: string;
}

function formatRfq(row: RfqDbRow, attachments: RfqAttachmentDbRow[] = []) {
  let selectedProducts: unknown[] = [];
  if (row.selected_products_json) {
    try {
      selectedProducts = JSON.parse(row.selected_products_json);
    } catch {
      selectedProducts = [];
    }
  }

  return {
    id: row.id,
    trackingCode: row.tracking_code,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    companyName: row.company_name || '',
    projectType: row.project_type || 'hotel',
    notes: row.notes || '',
    selectedProducts,
    status: row.status,
    internalNotes: row.internal_notes || '',
    attachments: attachments.map((a) => ({
      id: a.id,
      fileName: a.file_name,
      filePath: `/uploads/rfq/${a.file_path}`,
      fileSize: a.file_size,
      fileType: a.file_type,
      createdAt: a.created_at,
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// POST /api/v1/rfq (Public submission with drawing file uploads)
router.post('/', rfqLimiter, uploadRfqFiles.array('files', 10), (req: Request, res: Response): void => {
  const body = req.body;

  if (!body.fullName || !body.phone || !body.email) {
    res.status(400).json({ success: false, error: 'Họ tên, số điện thoại và email là bắt buộc' });
    return;
  }

  // Generate unique ID and RFQ tracking code: RFQ-YYYY-XXXXX
  const rfqId = crypto.randomUUID();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const currentYear = new Date().getFullYear();
  const trackingCode = `RFQ-${currentYear}-${randomSuffix}`;

  let selectedProductsJson = '[]';
  if (body.selectedProducts) {
    if (typeof body.selectedProducts === 'string') {
      selectedProductsJson = body.selectedProducts;
    } else {
      selectedProductsJson = JSON.stringify(body.selectedProducts);
    }
  }

  db.run(
    `INSERT INTO rfqs (
      id, tracking_code, full_name, phone, email, company_name, project_type, notes, selected_products_json, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [
      rfqId,
      trackingCode,
      body.fullName.trim(),
      body.phone.trim(),
      body.email.trim(),
      body.companyName ? body.companyName.trim() : null,
      body.projectType || 'hotel',
      body.notes ? body.notes.trim() : null,
      selectedProductsJson,
    ]
  );

  // Process attachments if uploaded
  const files = (req.files as Express.Multer.File[]) || [];
  for (const file of files) {
    db.run(
      `INSERT INTO rfq_attachments (rfq_id, file_name, file_path, file_size, file_type)
       VALUES (?, ?, ?, ?, ?)`,
      [rfqId, file.originalname, file.filename, file.size, file.mimetype]
    );
  }

  res.status(201).json({
    success: true,
    data: {
      id: rfqId,
      trackingCode,
      message: 'Tiếp nhận yêu cầu báo giá dự án thành công',
      attachedCount: files.length,
    },
  });
});

// GET /api/v1/rfqs (Admin Only)
router.get('/', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { status, search } = req.query;

  let query = 'SELECT * FROM rfqs WHERE 1=1';
  const params: (string | number)[] = [];

  if (status && typeof status === 'string' && status !== 'all') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = `%${search.trim().toLowerCase()}%`;
    query += ` AND (
      LOWER(tracking_code) LIKE ? OR
      LOWER(full_name) LIKE ? OR
      LOWER(phone) LIKE ? OR
      LOWER(email) LIKE ? OR
      LOWER(company_name) LIKE ?
    )`;
    params.push(q, q, q, q, q);
  }

  query += ' ORDER BY created_at DESC';

  const rows = db.all<RfqDbRow>(query, params);

  // Batch fetch attachments
  const rfqList = rows.map((row) => {
    const attachments = db.all<RfqAttachmentDbRow>('SELECT * FROM rfq_attachments WHERE rfq_id = ?', [row.id]);
    return formatRfq(row, attachments);
  });

  res.json({
    success: true,
    data: rfqList,
    total: rfqList.length,
  });
});

// GET /api/v1/rfqs/:id (Admin Only)
router.get('/:id', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const row = db.get<RfqDbRow>('SELECT * FROM rfqs WHERE id = ? OR tracking_code = ?', [id, id]);

  if (!row) {
    res.status(404).json({ success: false, error: 'Không tìm thấy hồ sơ báo giá' });
    return;
  }

  const attachments = db.all<RfqAttachmentDbRow>('SELECT * FROM rfq_attachments WHERE rfq_id = ?', [row.id]);
  res.json({ success: true, data: formatRfq(row, attachments) });
});

// PATCH /api/v1/rfqs/:id/status (Admin Only)
router.patch('/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const { status, internal_notes } = req.body;

  const validStatuses = ['pending', 'reviewing', 'quoted', 'contracted', 'rejected'];
  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({ success: false, error: 'Trạng thái không hợp lệ' });
    return;
  }

  const result = db.run(
    `UPDATE rfqs SET
      status = ?,
      internal_notes = COALESCE(?, internal_notes),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [status, internal_notes ?? null, id]
  );

  if (!result.changes) {
    res.status(404).json({ success: false, error: 'Hồ sơ báo giá không tồn tại' });
    return;
  }

  res.json({ success: true, message: `Cập nhật trạng thái sang ${status} thành công` });
});

export default router;
