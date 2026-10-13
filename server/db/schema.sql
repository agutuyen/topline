-- ==============================================================
-- TOPLINE HOSPITALITY FURNITURE — DATABASE SCHEMA
-- Dual Compatibility: SQLite (Node.js) & MariaDB 10.4+ / MySQL 8.0
-- Standard: ANSI SQL with parameterized queries
-- ==============================================================

-- 1. ADMIN USERS (Phân quyền quản trị viên)
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    is_active INTEGER DEFAULT 1,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. COLLECTIONS (6 Bộ sưu tập chính thức - Song ngữ)
CREATE TABLE IF NOT EXISTS collections (
    id VARCHAR(50) PRIMARY KEY,
    number VARCHAR(10) NOT NULL,
    title_vi VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    subtitle_vi TEXT,
    subtitle_en TEXT,
    pieces_summary VARCHAR(255),
    overview_image VARCHAR(255),
    detail_image VARCHAR(255),
    materials_summary_vi TEXT,
    materials_summary_en TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1
);

-- 3. PRODUCTS (29 Sản phẩm nội thất may đo - Song ngữ)
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    collection_id VARCHAR(50) NOT NULL,
    name_vi VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_label_vi VARCHAR(100),
    category_label_en VARCHAR(100),
    dimensions VARCHAR(100) NOT NULL,
    dimensions_cm VARCHAR(100),
    materials_vi TEXT NOT NULL,
    materials_en TEXT NOT NULL,
    finish_vi TEXT NOT NULL,
    finish_en TEXT NOT NULL,
    color_vi VARCHAR(100),
    color_en VARCHAR(100),
    hardware_vi VARCHAR(255),
    hardware_en VARCHAR(255),
    design_style_vi VARCHAR(100),
    design_style_en VARCHAR(100),
    description_vi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    cutout_image VARCHAR(255),
    collection_image VARCHAR(255),
    detail_image VARCHAR(255),
    tags TEXT,
    seo_keywords TEXT,
    is_published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(is_published);

-- 4. PRODUCT IMAGES (Quản lý đa góc nhìn ảnh sản phẩm)
CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id VARCHAR(50) NOT NULL,
    image_type VARCHAR(30) DEFAULT 'studio',
    image_url VARCHAR(255) NOT NULL,
    caption_vi VARCHAR(255),
    caption_en VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_product_images_pid ON product_images(product_id);

-- 5. RFQS (Yêu cầu báo giá dự án từ khách hàng)
CREATE TABLE IF NOT EXISTS rfqs (
    id VARCHAR(50) PRIMARY KEY,
    tracking_code VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    company_name VARCHAR(150),
    project_type VARCHAR(50),
    notes TEXT,
    selected_products_json TEXT,
    status VARCHAR(30) DEFAULT 'pending',
    internal_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rfqs_status ON rfqs(status);
CREATE INDEX IF NOT EXISTS idx_rfqs_tracking ON rfqs(tracking_code);

-- 6. RFQ ATTACHMENTS (Bản vẽ DWG, CAD, BOQ, PDF do khách tải lên)
CREATE TABLE IF NOT EXISTS rfq_attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rfq_id VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_rfq_attachments_rfq ON rfq_attachments(rfq_id);

-- 7. CONTACT MESSAGES (Hộp thư liên hệ chung)
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'unread',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- 8. AUDIT LOGS (Nhật ký kiểm toán an toàn & thao tác admin)
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER,
    action VARCHAR(100) NOT NULL,
    target_entity VARCHAR(50),
    target_id VARCHAR(50),
    details_json TEXT,
    ip_address VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL
);
