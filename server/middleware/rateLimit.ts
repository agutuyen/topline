import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export function createRateLimiter(options: { windowMs: number; max: number; message: string }) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + options.windowMs });
      next();
      return;
    }

    if (record.count >= options.max) {
      res.status(429).json({ success: false, error: options.message });
      return;
    }

    record.count += 1;
    next();
  };
}

// Login limiter: 10 attempts per 15 minutes
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau 15 phút.',
});

// RFQ submission limiter: 20 submissions per hour
export const rfqLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: 'Đã đạt giới hạn gửi yêu cầu báo giá trong 1 giờ. Vui lòng thử lại sau.',
});
