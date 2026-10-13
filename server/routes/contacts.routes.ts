import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimit';

const router = Router();

const contactLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: 'Bạn đã gửi tin nhắn liên hệ quá nhiều lần trong 1 giờ. Vui lòng thử lại sau.',
});

interface ContactDbRow {
  id: number;
  full_name: string;
  phone: string | null;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

// POST /api/v1/contacts (Public)
router.post('/', contactLimiter, (req: Request, res: Response): void => {
  const { fullName, phone, email, subject, message } = req.body;

  if (!fullName || !email || !message) {
    res.status(400).json({ success: false, error: 'Họ tên, email và nội dung tin nhắn là bắt buộc' });
    return;
  }

  db.run(
    `INSERT INTO contacts (full_name, phone, email, subject, message, status)
     VALUES (?, ?, ?, ?, ?, 'unread')`,
    [
      String(fullName).trim(),
      phone ? String(phone).trim() : null,
      String(email).trim(),
      subject ? String(subject).trim() : null,
      String(message).trim(),
    ]
  );

  res.status(201).json({ success: true, message: 'Gửi tin nhắn liên hệ thành công. TopLine sẽ phản hồi sớm nhất.' });
});

// GET /api/v1/contacts (Admin Only)
router.get('/', requireAdmin, (_req: AuthenticatedRequest, res: Response): void => {
  const rows = db.all<ContactDbRow>('SELECT * FROM contacts ORDER BY created_at DESC');
  res.json({
    success: true,
    data: rows.map((r) => ({
      id: r.id,
      fullName: r.full_name,
      phone: r.phone || '',
      email: r.email,
      subject: r.subject || '',
      message: r.message,
      status: r.status,
      createdAt: r.created_at,
    })),
    total: rows.length,
  });
});

// PATCH /api/v1/contacts/:id/status (Admin Only)
router.patch('/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const { status } = req.body;

  const valid = ['unread', 'read', 'replied'];
  if (!status || !valid.includes(status)) {
    res.status(400).json({ success: false, error: 'Trạng thái không hợp lệ' });
    return;
  }

  const result = db.run('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);
  if (!result.changes) {
    res.status(404).json({ success: false, error: 'Tin nhắn không tồn tại' });
    return;
  }

  res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
});

export default router;
