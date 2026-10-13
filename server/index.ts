import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';
import { seedDatabase } from './db/seed';

import authRoutes from './routes/auth.routes';
import productsRoutes from './routes/products.routes';
import collectionsRoutes from './routes/collections.routes';
import rfqRoutes from './routes/rfq.routes';
import contactsRoutes from './routes/contacts.routes';
import mediaRoutes from './routes/media.routes';
import statsRoutes from './routes/stats.routes';

dotenv.config();

// Auto-initialize & seed SQLite database
try {
  seedDatabase();
} catch (err) {
  console.error('[Database] Initialization error:', err);
}

const app = express();
const PORT = process.env.API_PORT || process.env.PORT || 3001;

// 1. Security & CORS Headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(
  cors({
    origin: true, // Allow frontend origin in dev/prod
    credentials: true,
  })
);

// 2. Request body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Static Uploads directory
const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// 4. API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'TopLine Hospitality Furniture API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 5. Mount API Routes (/api/v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/collections', collectionsRoutes);
app.use('/api/v1/rfq', rfqRoutes);
app.use('/api/v1/rfqs', rfqRoutes);
app.use('/api/v1/contacts', contactsRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/dashboard/stats', statsRoutes);

// 6. Production Static Build Serving
const distDir = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distDir) && process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// 7. Central Error Handling
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[API Error]:', err);
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(500).json({ success: false, error: message });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[TopLine API Server] Running on http://localhost:${PORT}`);
    console.log(`[TopLine API Server] Health check at http://localhost:${PORT}/api/health`);
  });
}

export default app;
