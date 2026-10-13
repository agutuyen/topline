import { initDatabase, db } from './index';
import {
  COLLECTIONS_OVERVIEW,
  PRODUCTS_CATALOG,
  MILLWORK_PROJECTS,
  COMMERCIAL_CLIENTS,
} from '../../src/data/content';
import { hashPassword } from '../services/auth.service';

export function seedDatabase(): void {
  // 1. Initialize schema and column migrations
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
    const gallery = [
      { url: c.overviewImage, caption: c.title.vi, isCover: true },
      ...(c.detailImage ? [{ url: c.detailImage, caption: 'Mẫu vật liệu tuyển chọn', isCover: false }] : []),
    ];
    const galleryJson = JSON.stringify(gallery);

    if (!exists) {
      db.run(
        `INSERT INTO collections (
          id, number, title_vi, title_en, subtitle_vi, subtitle_en, pieces_summary,
          overview_image, detail_image, materials_summary_vi, materials_summary_en,
          gallery_images_json, sort_order, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
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
          galleryJson,
          i + 1,
        ]
      );
    } else {
      // Update gallery if empty
      db.run('UPDATE collections SET gallery_images_json = COALESCE(gallery_images_json, ?) WHERE id = ?', [
        galleryJson,
        c.id,
      ]);
    }
  }
  console.log(`[Seed] Synced ${COLLECTIONS_OVERVIEW.length} collections.`);

  // 4. Seed Products with Multi-Image Gallery
  let inserted = 0;
  for (const p of PRODUCTS_CATALOG) {
    const exists = db.get<{ id: string }>('SELECT id FROM products WHERE id = ?', [p.id]);
    const tagsStr = Array.isArray(p.tags) ? p.tags.join(', ') : '';

    const gallery = [
      { url: p.image, caption: p.name.vi, isCover: true },
      ...(p.cutoutImage ? [{ url: p.cutoutImage, caption: 'Bản vẽ tách nền kiến trúc', isCover: false }] : []),
      ...(p.collectionImage ? [{ url: p.collectionImage, caption: 'Phối cảnh không gian nội thất', isCover: false }] : []),
      ...(p.detailImage ? [{ url: p.detailImage, caption: 'Cận cảnh thớ gỗ & vật liệu đá', isCover: false }] : []),
    ];
    const galleryJson = JSON.stringify(gallery);

    if (!exists) {
      db.run(
        `INSERT INTO products (
          id, sku, collection_id, name_vi, name_en, category, category_label_vi, category_label_en,
          dimensions, dimensions_cm, materials_vi, materials_en, finish_vi, finish_en,
          color_vi, color_en, hardware_vi, hardware_en, design_style_vi, design_style_en,
          description_vi, description_en, image, cutout_image, collection_image, detail_image,
          gallery_images_json, tags, seo_keywords, is_published
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, 1
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
          galleryJson,
          tagsStr,
          p.seoKeywords || null,
        ]
      );
      inserted++;
    } else {
      // Ensure gallery_images_json is populated
      db.run('UPDATE products SET gallery_images_json = COALESCE(gallery_images_json, ?) WHERE id = ?', [
        galleryJson,
        p.id,
      ]);
    }
  }
  console.log(`[Seed] Synced ${PRODUCTS_CATALOG.length} products (inserted: ${inserted}).`);

  // 5. Seed Millwork Projects (Mộc Kiến Trúc & Dự Án Thương Mại)
  for (let i = 0; i < MILLWORK_PROJECTS.length; i++) {
    const proj = MILLWORK_PROJECTS[i];
    const exists = db.get<{ id: string }>('SELECT id FROM millwork_projects WHERE id = ?', [proj.id]);
    const galleryJson = JSON.stringify(proj.galleryImages);

    if (!exists) {
      db.run(
        `INSERT INTO millwork_projects (
          id, client, badge_vi, badge_en, title_vi, title_en, desc_vi, desc_en,
          scope_vi, scope_en, materials_vi, materials_en, standards_vi, standards_en,
          image, gallery_images_json, sort_order, is_active
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, 1
        )`,
        [
          proj.id,
          proj.client,
          proj.badge.vi,
          proj.badge.en,
          proj.title.vi,
          proj.title.en,
          proj.desc.vi,
          proj.desc.en,
          proj.scope.vi,
          proj.scope.en,
          proj.materials.vi,
          proj.materials.en,
          proj.standards.vi,
          proj.standards.en,
          proj.image,
          galleryJson,
          i + 1,
        ]
      );
    } else {
      db.run('UPDATE millwork_projects SET gallery_images_json = COALESCE(gallery_images_json, ?) WHERE id = ?', [
        galleryJson,
        proj.id,
      ]);
    }
  }
  console.log(`[Seed] Synced ${MILLWORK_PROJECTS.length} millwork projects.`);

  // 6. Seed Commercial Clients (Logo đối tác F&B)
  const clientCount = db.get<{ count: number }>('SELECT count(*) as count FROM commercial_clients');
  if (!clientCount || clientCount.count === 0) {
    for (let i = 0; i < COMMERCIAL_CLIENTS.length; i++) {
      const cl = COMMERCIAL_CLIENTS[i];
      db.run(
        `INSERT INTO commercial_clients (name, role, logo_text, sort_order)
         VALUES (?, ?, ?, ?)`,
        [cl.name, cl.role, cl.logoText, i + 1]
      );
    }
    console.log(`[Seed] Synced ${COMMERCIAL_CLIENTS.length} commercial partner brands.`);
  }
}

// Run standalone if invoked directly
if (process.argv[1]?.includes('seed.ts')) {
  seedDatabase();
  console.log('[Seed] Database initialization and seeding complete.');
}
