import { Router, Request, Response } from 'express';
import { db } from '../db';
import { verifyPassword, hashPassword, generateToken } from '../services/auth.service';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth';
import { loginLimiter } from '../middleware/rateLimit';

const router = Router();

interface AdminDbRow {
  id: number;
  username: string;
  password_hash: string;
  salt: string;
  email: string;
  full_name: string;
  role: string;
  is_active: number;
}

// POST /api/v1/auth/login
router.post('/login', loginLimiter, (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).json({ success: false, error: 'Tên đăng nhập và mật khẩu là bắt buộc' });
    return;
  }

  const admin = db.get<AdminDbRow>(
    'SELECT id, username, password_hash, salt, email, full_name, role, is_active FROM admins WHERE username = ? OR email = ?',
    [username.trim(), username.trim()]
  );

  if (!admin || !admin.is_active) {
    res.status(401).json({ success: false, error: 'Tài khoản hoặc mật khẩu không chính xác' });
    return;
  }

  const isValid = verifyPassword(password, admin.password_hash, admin.salt);
  if (!isValid) {
    res.status(401).json({ success: false, error: 'Tài khoản hoặc mật khẩu không chính xác' });
    return;
  }

  // Update last_login
  db.run('UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [admin.id]);

  const token = generateToken({
    id: admin.id,
    username: admin.username,
    role: admin.role,
  });

  res.json({
    success: true,
    data: {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role,
      },
    },
  });
});

// GET /api/v1/auth/me
router.get('/me', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  if (!req.admin) {
    res.status(401).json({ success: false, error: 'Chưa đăng nhập' });
    return;
  }

  const admin = db.get<Omit<AdminDbRow, 'password_hash' | 'salt'>>(
    'SELECT id, username, email, full_name, role, last_login, created_at FROM admins WHERE id = ?',
    [req.admin.id]
  );

  if (!admin) {
    res.status(404).json({ success: false, error: 'Không tìm thấy thông tin quản trị viên' });
    return;
  }

  res.json({ success: true, data: admin });
});

// PUT /api/v1/auth/change-password
router.put('/change-password', requireAdmin, (req: AuthenticatedRequest, res: Response): void => {
  if (!req.admin) {
    res.status(401).json({ success: false, error: 'Chưa đăng nhập' });
    return;
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    res.status(400).json({ success: false, error: 'Mật khẩu mới phải có ít nhất 8 ký tự' });
    return;
  }

  const admin = db.get<AdminDbRow>('SELECT id, password_hash, salt FROM admins WHERE id = ?', [req.admin.id]);
  if (!admin) {
    res.status(404).json({ success: false, error: 'Tài khoản không tồn tại' });
    return;
  }

  const isValid = verifyPassword(currentPassword, admin.password_hash, admin.salt);
  if (!isValid) {
    res.status(400).json({ success: false, error: 'Mật khẩu hiện tại không đúng' });
    return;
  }

  const { hash, salt } = hashPassword(newPassword);
  db.run('UPDATE admins SET password_hash = ?, salt = ? WHERE id = ?', [hash, salt, admin.id]);

  res.json({ success: true, message: 'Đổi mật khẩu thành công' });
});

export default router;
