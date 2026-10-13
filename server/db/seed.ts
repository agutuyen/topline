import { initDatabase, db } from './index';
import { COLLECTIONS_OVERVIEW, PRODUCTS_CATALOG } from '../../src/data/content';
import { hashPassword } from '../services/auth.service';

export function seedDatabase(): void {
  // 1. Initialize schema
  initDatabase();

  // 2. Seed Admin User
  const existingAdmin = db.get<{ id: number }>('SELECT id FROM admins WHERE username = ?', ['admin']);
  if (!existingAdmin) {
    const { hash, salt } = hashPassword('TopLine@2026!');
    db.run(
      `INSERT INTO admins (username, password_hash, salt, email, full_name, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      ['admin', hash, salt, 'admin@toplinefurniture.vn', 'Ban Giám Đốc TopLine', 'superadmin']
    );
    console.log('[Seed] Created default superadmin: admin / TopLine@2026!');
  }

  // 3. Seed Collections
  for (let i = 0; i < COLLECTIONS_OVERVIEW.length; i++) {
    const c = COLLECTIONS_OVERVIEW[i];
    const exists = db.get<{ id: string }>('SELECT id FROM collections WHERE id = ?', [c.id]);
    if (!exists) {
      db.run(
        `INSERT INTO collections (id, number, title_vi, title_en, subtitle_vi, subtitle_en, pieces_summary, overview_image, detail_image, materials_summary_vi, materials_summary_en, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [
          c.id,
          c.number,
          c.title.vi,
          c.title.en,
          c.subtitle.vi,
          c.subtitle.en,
          c.pieces,
          c.overviewImage,
          c.detailImage || null,
          c.materialsSummary?.vi || null,
          c.materialsSummary?.en || null,
          i + 1,
        ]
      );
    }
  }
  console.log(`[Seed] Synced ${COLLECTIONS_OVERVIEW.length} collections.`);

  // 4. Seed Products
  let inserted = 0;
  for (const p of PRODUCTS_CATALOG) {
    const exists = db.get<{ id: string }>('SELECT id FROM products WHERE id = ?', [p.id]);
    const tagsStr = Array.isArray(p.tags) ? p.tags.join(', ') : '';

    if (!exists) {
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
          ?, ?, 1
        )`,
        [
          p.id,
          p.sku || p.id.toUpperCase(),
          p.collectionId || p.category,
          p.name.vi,
          p.name.en,
          p.category,
          p.categoryLabel.vi,
          p.categoryLabel.en,
          p.dimensions,
          p.dimensionsCm || null,
          p.materials.vi,
          p.materials.en,
          p.finish.vi,
          p.finish.en,
          p.color?.vi || null,
          p.color?.en || null,
          p.hardware?.vi || null,
          p.hardware?.en || null,
          p.designStyle?.vi || null,
          p.designStyle?.en || null,
          p.description.vi,
          p.description.en,
          p.image,
          p.cutoutImage || null,
          p.collectionImage || null,
          p.detailImage || null,
          tagsStr,
          p.seoKeywords || null,
        ]
      );
      inserted++;
    }
  }
  console.log(`[Seed] Synced ${PRODUCTS_CATALOG.length} products (inserted: ${inserted}).`);
}

// Run standalone if invoked directly
if (process.argv[1]?.includes('seed.ts')) {
  seedDatabase();
  console.log('[Seed] Database initialization and seeding complete.');
}
