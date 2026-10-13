<?php
/**
 * TopLine Hospitality Furniture — High-Performance Native API Backend
 * Compatible with LiteSpeed, Apache, Nginx, Plesk & cPanel (PHP 8.x+)
 * Uses built-in PDO SQLite (data/topline.db) with MariaDB readiness.
 */

// 1. CORS & Response Headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Database Connection (SQLite)
$baseDir = dirname(__DIR__);
$dbDir = $baseDir . '/data';
if (!is_dir($dbDir)) {
    @mkdir($dbDir, 0755, true);
}
$dbPath = $dbDir . '/topline.db';

try {
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// 3. JWT Helper Functions
define('JWT_SECRET', 'topline_furniture_secret_jwt_key_2026_contract_luxury_change_in_production');

function base64UrlEncode($data) {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}

function base64UrlDecode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $padlen = 4 - $remainder;
        $data .= str_repeat('=', $padlen);
    }
    return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
}

function generateJwt($payload) {
    $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
    $payload['exp'] = time() + (7 * 24 * 60 * 60); // 7 days
    $payloadJson = json_encode($payload);
    
    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payloadJson);
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = base64UrlEncode($signature);
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function verifyJwt($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    
    list($header, $payload, $signature) = $parts;
    $expectedSig = base64UrlEncode(hash_hmac('sha256', $header . "." . $payload, JWT_SECRET, true));
    
    if (!hash_equals($expectedSig, $signature)) return null;
    
    $data = json_decode(base64UrlDecode($payload), true);
    if (isset($data['exp']) && $data['exp'] < time()) return null; // Expired
    return $data;
}

function getAuthAdmin() {
    $headers = getallheaders();
    $auth = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : '');
    if (!$auth && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    if (!$auth || !str_starts_with($auth, 'Bearer ')) {
        return null;
    }
    $token = trim(substr($auth, 7));
    return verifyJwt($token);
}

function requireAuth() {
    $admin = getAuthAdmin();
    if (!$admin) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Chưa đăng nhập hoặc phiên làm việc đã hết hạn']);
        exit;
    }
    return $admin;
}

// 4. Request Route & Method Extraction
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Normalize route path: remove /api/v1 or /api or /index.php prefixes
$route = preg_replace('#^/(dist/)?api(/v1)?#', '', $uri);
if (!$route || $route === '/') $route = '/health';

// Read JSON input body if present
$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?: [];

// ==========================================
// 5. ROUTE HANDLERS
// ==========================================

// Health Check: GET /health or /api/health
if ($route === '/health' || $route === '/api/health') {
    echo json_encode([
        'status' => 'ok',
        'service' => 'TopLine Hospitality Furniture API (Native Engine)',
        'version' => '1.0.0',
        'engine' => 'PHP ' . PHP_VERSION,
        'database' => 'SQLite 3'
    ]);
    exit;
}

// ── AUTH ROUTES ──
// POST /auth/login
if ($route === '/auth/login' && $method === 'POST') {
    $username = trim($body['username'] ?? '');
    $password = trim($body['password'] ?? '');

    if (!$username || !$password) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Tên đăng nhập và mật khẩu là bắt buộc']);
        exit;
    }

    $stmt = $db->prepare('SELECT * FROM admins WHERE username = :u OR email = :e LIMIT 1');
    $stmt->execute([':u' => $username, ':e' => $username]);
    $admin = $stmt->fetch();

    $valid = false;
    if ($admin) {
        $testHash = hash_pbkdf2('sha512', $password, $admin['salt'], 100000, 128);
        $valid = hash_equals($admin['password_hash'], $testHash);
    }

    // Default fallback check for primary superadmin
    if (!$valid && $username === 'admin' && $password === 'TopLine@2026!') {
        $valid = true;
        if (!$admin) {
            $salt = bin2hex(random_bytes(16));
            $hash = hash_pbkdf2('sha512', 'TopLine@2026!', $salt, 100000, 128);
            $db->prepare('INSERT OR IGNORE INTO admins (id, username, password_hash, salt, email, full_name, role) VALUES (1, "admin", :h, :s, "admin@toplinefurniture.vn", "Ban Giám Đốc TopLine", "superadmin")')->execute([':h' => $hash, ':s' => $salt]);
            $admin = ['id' => 1, 'username' => 'admin', 'email' => 'admin@toplinefurniture.vn', 'full_name' => 'Ban Giám Đốc TopLine', 'role' => 'superadmin'];
        }
    }

    if (!$valid) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Tài khoản hoặc mật khẩu không chính xác']);
        exit;
    }

    $token = generateJwt(['id' => $admin['id'], 'username' => $admin['username'], 'role' => $admin['role']]);
    echo json_encode([
        'success' => true,
        'data' => [
            'token' => $token,
            'admin' => [
                'id' => (int)$admin['id'],
                'username' => $admin['username'],
                'email' => $admin['email'],
                'full_name' => $admin['full_name'],
                'role' => $admin['role']
            ]
        ]
    ]);
    exit;
}

// GET /auth/me
if ($route === '/auth/me' && $method === 'GET') {
    $jwt = requireAuth();
    $stmt = $db->prepare('SELECT id, username, email, full_name, role, last_login, created_at FROM admins WHERE id = :id');
    $stmt->execute([':id' => $jwt['id']]);
    $admin = $stmt->fetch();
    echo json_encode(['success' => true, 'data' => $admin]);
    exit;
}

// ── COLLECTIONS ROUTES ──
// GET /collections
if ($route === '/collections' && $method === 'GET') {
    $stmt = $db->query('SELECT * FROM collections WHERE is_active = 1 ORDER BY sort_order ASC');
    $rows = $stmt->fetchAll();
    $data = array_map(function($r) {
        return [
            'id' => $r['id'],
            'number' => $r['number'],
            'title' => ['vi' => $r['title_vi'], 'en' => $r['title_en']],
            'subtitle' => ['vi' => $r['subtitle_vi'] ?? '', 'en' => $r['subtitle_en'] ?? ''],
            'pieces' => $r['pieces_summary'] ?? '',
            'overviewImage' => $r['overview_image'] ?? '',
            'detailImage' => $r['detail_image'] ?? null,
            'materialsSummary' => $r['materials_summary_vi'] ? [
                'vi' => $r['materials_summary_vi'],
                'en' => $r['materials_summary_en'] ?? $r['materials_summary_vi']
            ] : null,
            'sortOrder' => (int)$r['sort_order'],
            'isActive' => (bool)$r['is_active']
        ];
    }, $rows);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

// PUT /collections/{id}
if (preg_match('#^/collections/([^/]+)$#', $route, $m) && $method === 'PUT') {
    requireAuth();
    $id = $m[1];
    $titleVi = $body['title']['vi'] ?? $body['title_vi'] ?? null;
    $titleEn = $body['title']['en'] ?? $body['title_en'] ?? null;
    $subVi = $body['subtitle']['vi'] ?? $body['subtitle_vi'] ?? null;
    $subEn = $body['subtitle']['en'] ?? $body['subtitle_en'] ?? null;
    $pieces = $body['pieces'] ?? $body['pieces_summary'] ?? null;
    $overviewImg = $body['overviewImage'] ?? $body['overview_image'] ?? null;

    $stmt = $db->prepare('UPDATE collections SET
        title_vi = COALESCE(:tvi, title_vi),
        title_en = COALESCE(:ten, title_en),
        subtitle_vi = COALESCE(:svi, subtitle_vi),
        subtitle_en = COALESCE(:sen, subtitle_en),
        pieces_summary = COALESCE(:p, pieces_summary),
        overview_image = COALESCE(:img, overview_image)
        WHERE id = :id');
    $stmt->execute([
        ':tvi' => $titleVi,
        ':ten' => $titleEn,
        ':svi' => $subVi,
        ':sen' => $subEn,
        ':p' => $pieces,
        ':img' => $overviewImg,
        ':id' => $id
    ]);
    echo json_encode(['success' => true, 'message' => 'Cập nhật bộ sưu tập thành công']);
    exit;
}

// ── PRODUCTS ROUTES ──
// GET /products
if ($route === '/products' && $method === 'GET') {
    $category = $_GET['category'] ?? '';
    $search = trim($_GET['search'] ?? '');
    
    $sql = 'SELECT * FROM products WHERE 1=1';
    $params = [];

    if ($category && $category !== 'all') {
        $sql .= ' AND (category = :cat OR collection_id = :cat)';
        $params[':cat'] = $category;
    }

    if ($search) {
        $sql .= ' AND (LOWER(sku) LIKE :q OR LOWER(name_vi) LIKE :q OR LOWER(name_en) LIKE :q OR LOWER(materials_vi) LIKE :q)';
        $params[':q'] = '%' . strtolower($search) . '%';
    }

    $sql .= ' ORDER BY collection_id ASC, sku ASC';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $products = array_map(function($r) {
        $tags = $r['tags'] ? array_filter(array_map('trim', explode(',', $r['tags']))) : [];
        return [
            'id' => $r['id'],
            'sku' => $r['sku'],
            'name' => ['vi' => $r['name_vi'], 'en' => $r['name_en']],
            'category' => $r['category'],
            'categoryLabel' => ['vi' => $r['category_label_vi'] ?: $r['category'], 'en' => $r['category_label_en'] ?: $r['category']],
            'collectionId' => $r['collection_id'],
            'collectionName' => ['vi' => $r['category_label_vi'] ?: $r['collection_id'], 'en' => $r['category_label_en'] ?: $r['collection_id']],
            'dimensions' => $r['dimensions'],
            'dimensionsCm' => $r['dimensions_cm'] ?: null,
            'materials' => ['vi' => $r['materials_vi'], 'en' => $r['materials_en']],
            'finish' => ['vi' => $r['finish_vi'], 'en' => $r['finish_en']],
            'color' => $r['color_vi'] ? ['vi' => $r['color_vi'], 'en' => $r['color_en'] ?: $r['color_vi']] : null,
            'hardware' => $r['hardware_vi'] ? ['vi' => $r['hardware_vi'], 'en' => $r['hardware_en'] ?: $r['hardware_vi']] : null,
            'designStyle' => $r['design_style_vi'] ? ['vi' => $r['design_style_vi'], 'en' => $r['design_style_en'] ?: $r['design_style_vi']] : null,
            'description' => ['vi' => $r['description_vi'], 'en' => $r['description_en']],
            'features' => ['vi' => $r['description_vi'], 'en' => $r['description_en']],
            'image' => $r['image'],
            'cutoutImage' => $r['cutout_image'] ?: null,
            'collectionImage' => $r['collection_image'] ?: null,
            'detailImage' => $r['detail_image'] ?: null,
            'tags' => array_values($tags),
            'seoKeywords' => $r['seo_keywords'] ?: null,
            'isPublished' => (bool)$r['is_published'],
            'createdAt' => $r['created_at'],
            'updatedAt' => $r['updated_at']
        ];
    }, $rows);

    echo json_encode(['success' => true, 'data' => $products, 'total' => count($products)]);
    exit;
}

// POST /products (Create Product)
if ($route === '/products' && $method === 'POST') {
    requireAuth();
    $sku = trim($body['sku'] ?? '');
    $nameVi = trim($body['name']['vi'] ?? $body['name_vi'] ?? '');
    $nameEn = trim($body['name']['en'] ?? $body['name_en'] ?? '');
    $colId = trim($body['collectionId'] ?? $body['collection_id'] ?? 'warm-wood');

    if (!$sku || !$nameVi || !$nameEn) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Mã SKU và Tên sản phẩm (VI & EN) là bắt buộc']);
        exit;
    }

    $id = strtolower(preg_replace('/[^a-zA-Z0-9-]/', '-', $sku));
    
    $stmt = $db->prepare('INSERT INTO products (
        id, sku, collection_id, name_vi, name_en, category, category_label_vi, category_label_en,
        dimensions, dimensions_cm, materials_vi, materials_en, finish_vi, finish_en,
        color_vi, color_en, hardware_vi, hardware_en, description_vi, description_en,
        image, cutout_image, tags, is_published
    ) VALUES (
        :id, :sku, :col, :nvi, :nen, :col, :col, :col,
        :dim, :dimcm, :mvi, :men, :fvi, :fen,
        :cvi, :cen, :hvi, :hen, :dvi, :den,
        :img, :cutout, :tags, :pub
    )');
    $stmt->execute([
        ':id' => $id,
        ':sku' => $sku,
        ':col' => $colId,
        ':nvi' => $nameVi,
        ':nen' => $nameEn,
        ':dim' => $body['dimensions'] ?? 'W1200 x D450 x H750 mm',
        ':dimcm' => $body['dimensionsCm'] ?? $body['dimensions_cm'] ?? null,
        ':mvi' => $body['materials']['vi'] ?? $body['materials_vi'] ?? 'Gỗ sồi tự nhiên',
        ':men' => $body['materials']['en'] ?? $body['materials_en'] ?? 'Natural White Oak',
        ':fvi' => $body['finish']['vi'] ?? $body['finish_vi'] ?? 'Sơn PU mờ',
        ':fen' => $body['finish']['en'] ?? $body['finish_en'] ?? 'Matte PU finish',
        ':cvi' => $body['color']['vi'] ?? $body['color_vi'] ?? null,
        ':cen' => $body['color']['en'] ?? $body['color_en'] ?? null,
        ':hvi' => $body['hardware']['vi'] ?? $body['hardware_vi'] ?? null,
        ':hen' => $body['hardware']['en'] ?? $body['hardware_en'] ?? null,
        ':dvi' => $body['description']['vi'] ?? $body['description_vi'] ?? $nameVi,
        ':den' => $body['description']['en'] ?? $body['description_en'] ?? $nameEn,
        ':img' => $body['image'] ?? '/images/products/TL-WW-01_Credenza_Cabinet.png',
        ':cutout' => $body['cutoutImage'] ?? $body['cutout_image'] ?? null,
        ':tags' => is_array($body['tags'] ?? null) ? implode(', ', $body['tags']) : ($body['tags'] ?? null),
        ':pub' => isset($body['isPublished']) ? ($body['isPublished'] ? 1 : 0) : 1
    ]);

    echo json_encode(['success' => true, 'message' => 'Tạo sản phẩm mới thành công', 'id' => $id]);
    exit;
}

// PUT /products/{id} (Update Product)
if (preg_match('#^/products/([^/]+)$#', $route, $m) && $method === 'PUT') {
    requireAuth();
    $id = $m[1];
    $stmt = $db->prepare('UPDATE products SET
        sku = COALESCE(:sku, sku),
        collection_id = COALESCE(:col, collection_id),
        name_vi = COALESCE(:nvi, name_vi),
        name_en = COALESCE(:nen, name_en),
        dimensions = COALESCE(:dim, dimensions),
        dimensions_cm = COALESCE(:dimcm, dimensions_cm),
        materials_vi = COALESCE(:mvi, materials_vi),
        materials_en = COALESCE(:men, materials_en),
        finish_vi = COALESCE(:fvi, finish_vi),
        finish_en = COALESCE(:fen, finish_en),
        color_vi = COALESCE(:cvi, color_vi),
        color_en = COALESCE(:cen, color_en),
        hardware_vi = COALESCE(:hvi, hardware_vi),
        hardware_en = COALESCE(:hen, hardware_en),
        description_vi = COALESCE(:dvi, description_vi),
        description_en = COALESCE(:den, description_en),
        image = COALESCE(:img, image),
        cutout_image = COALESCE(:cutout, cutout_image),
        is_published = COALESCE(:pub, is_published),
        updated_at = CURRENT_TIMESTAMP
        WHERE id = :id');
    
    $stmt->execute([
        ':sku' => $body['sku'] ?? null,
        ':col' => $body['collectionId'] ?? $body['collection_id'] ?? null,
        ':nvi' => $body['name']['vi'] ?? $body['name_vi'] ?? null,
        ':nen' => $body['name']['en'] ?? $body['name_en'] ?? null,
        ':dim' => $body['dimensions'] ?? null,
        ':dimcm' => $body['dimensionsCm'] ?? $body['dimensions_cm'] ?? null,
        ':mvi' => $body['materials']['vi'] ?? $body['materials_vi'] ?? null,
        ':men' => $body['materials']['en'] ?? $body['materials_en'] ?? null,
        ':fvi' => $body['finish']['vi'] ?? $body['finish_vi'] ?? null,
        ':fen' => $body['finish']['en'] ?? $body['finish_en'] ?? null,
        ':cvi' => $body['color']['vi'] ?? $body['color_vi'] ?? null,
        ':cen' => $body['color']['en'] ?? $body['color_en'] ?? null,
        ':hvi' => $body['hardware']['vi'] ?? $body['hardware_vi'] ?? null,
        ':hen' => $body['hardware']['en'] ?? $body['hardware_en'] ?? null,
        ':dvi' => $body['description']['vi'] ?? $body['description_vi'] ?? null,
        ':den' => $body['description']['en'] ?? $body['description_en'] ?? null,
        ':img' => $body['image'] ?? null,
        ':cutout' => $body['cutoutImage'] ?? $body['cutout_image'] ?? null,
        ':pub' => isset($body['isPublished']) ? ($body['isPublished'] ? 1 : 0) : (isset($body['is_published']) ? ($body['is_published'] ? 1 : 0) : null),
        ':id' => $id
    ]);

    echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công']);
    exit;
}

// DELETE /products/{id}
if (preg_match('#^/products/([^/]+)$#', $route, $m) && $method === 'DELETE') {
    requireAuth();
    $id = $m[1];
    $stmt = $db->prepare('DELETE FROM products WHERE id = :id');
    $stmt->execute([':id' => $id]);
    echo json_encode(['success' => true, 'message' => 'Đã xóa sản phẩm ' . $id]);
    exit;
}

// PATCH /products/{id}/status
if (preg_match('#^/products/([^/]+)/status$#', $route, $m) && $method === 'PATCH') {
    requireAuth();
    $id = $m[1];
    $pub = isset($body['isPublished']) ? ($body['isPublished'] ? 1 : 0) : ($body['is_published'] ? 1 : 0);
    $stmt = $db->prepare('UPDATE products SET is_published = :pub WHERE id = :id');
    $stmt->execute([':pub' => $pub, ':id' => $id]);
    echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái thành công']);
    exit;
}

// ── RFQ ROUTES ──
// POST /rfq (Public Submission)
if ($route === '/rfq' && $method === 'POST') {
    $fullName = trim($_POST['fullName'] ?? $body['fullName'] ?? '');
    $phone = trim($_POST['phone'] ?? $body['phone'] ?? '');
    $email = trim($_POST['email'] ?? $body['email'] ?? '');
    $companyName = trim($_POST['companyName'] ?? $body['companyName'] ?? '');
    $projectType = trim($_POST['projectType'] ?? $body['projectType'] ?? 'hotel');
    $notes = trim($_POST['notes'] ?? $body['notes'] ?? '');
    $selectedProducts = $_POST['selectedProducts'] ?? $body['selectedProducts'] ?? '[]';

    if (!$fullName || !$phone || !$email) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Họ tên, số điện thoại và email là bắt buộc']);
        exit;
    }

    $rfqId = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000, mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff));
    $trackingCode = 'RFQ-' . date('Y') . '-' . rand(10000, 99999);

    $stmt = $db->prepare('INSERT INTO rfqs (
        id, tracking_code, full_name, phone, email, company_name, project_type, notes, selected_products_json, status
    ) VALUES (:id, :code, :name, :phone, :email, :comp, :ptype, :notes, :prods, "pending")');
    $stmt->execute([
        ':id' => $rfqId,
        ':code' => $trackingCode,
        ':name' => $fullName,
        ':phone' => $phone,
        ':email' => $email,
        ':comp' => $companyName ?: null,
        ':ptype' => $projectType,
        ':notes' => $notes ?: null,
        ':prods' => is_string($selectedProducts) ? $selectedProducts : json_encode($selectedProducts)
    ]);

    // Handle Uploaded Files
    $attachedCount = 0;
    if (!empty($_FILES['files']['name'])) {
        $uploadRfqDir = $baseDir . '/uploads/rfq';
        if (!is_dir($uploadRfqDir)) @mkdir($uploadRfqDir, 0755, true);

        $fileCount = is_array($_FILES['files']['name']) ? count($_FILES['files']['name']) : 1;
        for ($i = 0; $i < $fileCount; $i++) {
            $origName = is_array($_FILES['files']['name']) ? $_FILES['files']['name'][$i] : $_FILES['files']['name'];
            $tmpPath = is_array($_FILES['files']['tmp_name']) ? $_FILES['files']['tmp_name'][$i] : $_FILES['files']['tmp_name'];
            $size = is_array($_FILES['files']['size']) ? $_FILES['files']['size'][$i] : $_FILES['files']['size'];
            $type = is_array($_FILES['files']['type']) ? $_FILES['files']['type'][$i] : $_FILES['files']['type'];

            if ($origName && is_uploaded_file($tmpPath)) {
                $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
                $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($origName, PATHINFO_FILENAME)) . '_' . time() . '_' . rand(100, 999) . '.' . $ext;
                $targetFile = $uploadRfqDir . '/' . $safeName;

                if (move_uploaded_file($tmpPath, $targetFile)) {
                    $db->prepare('INSERT INTO rfq_attachments (rfq_id, file_name, file_path, file_size, file_type) VALUES (:rid, :fn, :fp, :fs, :ft)')
                       ->execute([':rid' => $rfqId, ':fn' => $origName, ':fp' => $safeName, ':fs' => $size, ':ft' => $type]);
                    $attachedCount++;
                }
            }
        }
    }

    echo json_encode([
        'success' => true,
        'data' => [
            'id' => $rfqId,
            'trackingCode' => $trackingCode,
            'message' => 'Tiếp nhận yêu cầu báo giá dự án thành công',
            'attachedCount' => $attachedCount
        ]
    ]);
    exit;
}

// GET /rfqs (Admin List)
if ($route === '/rfqs' && $method === 'GET') {
    requireAuth();
    $status = $_GET['status'] ?? '';
    $sql = 'SELECT * FROM rfqs WHERE 1=1';
    $params = [];
    if ($status && $status !== 'all') {
        $sql .= ' AND status = :st';
        $params[':st'] = $status;
    }
    $sql .= ' ORDER BY created_at DESC';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $rfqs = array_map(function($r) use ($db) {
        $attStmt = $db->prepare('SELECT * FROM rfq_attachments WHERE rfq_id = :rid');
        $attStmt->execute([':rid' => $r['id']]);
        $atts = $attStmt->fetchAll();

        return [
            'id' => $r['id'],
            'trackingCode' => $r['tracking_code'],
            'fullName' => $r['full_name'],
            'phone' => $r['phone'],
            'email' => $r['email'],
            'companyName' => $r['company_name'] ?: '',
            'projectType' => $r['project_type'] ?: 'hotel',
            'notes' => $r['notes'] ?: '',
            'selectedProducts' => json_decode($r['selected_products_json'] ?: '[]', true) ?: [],
            'status' => $r['status'],
            'internalNotes' => $r['internal_notes'] ?: '',
            'attachments' => array_map(function($a) {
                return [
                    'id' => (int)$a['id'],
                    'fileName' => $a['file_name'],
                    'filePath' => '/uploads/rfq/' . $a['file_path'],
                    'fileSize' => (int)$a['file_size'],
                    'fileType' => $a['file_type'],
                    'createdAt' => $a['created_at']
                ];
            }, $atts),
            'createdAt' => $r['created_at'],
            'updatedAt' => $r['updated_at']
        ];
    }, $rows);

    echo json_encode(['success' => true, 'data' => $rfqs, 'total' => count($rfqs)]);
    exit;
}

// PATCH /rfqs/{id}/status
if (preg_match('#^/rfqs/([^/]+)/status$#', $route, $m) && $method === 'PATCH') {
    requireAuth();
    $id = $m[1];
    $status = $body['status'] ?? 'pending';
    $notes = $body['internal_notes'] ?? null;
    $stmt = $db->prepare('UPDATE rfqs SET status = :st, internal_notes = COALESCE(:notes, internal_notes), updated_at = CURRENT_TIMESTAMP WHERE id = :id');
    $stmt->execute([':st' => $status, ':notes' => $notes, ':id' => $id]);
    echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái thành công']);
    exit;
}

// GET /dashboard/stats
if ($route === '/dashboard/stats' && $method === 'GET') {
    requireAuth();
    $rfqTotal = (int)$db->query('SELECT COUNT(*) FROM rfqs')->fetchColumn();
    $rfqPending = (int)$db->query('SELECT COUNT(*) FROM rfqs WHERE status = "pending"')->fetchColumn();
    $rfqReviewing = (int)$db->query('SELECT COUNT(*) FROM rfqs WHERE status = "reviewing"')->fetchColumn();
    $rfqQuoted = (int)$db->query('SELECT COUNT(*) FROM rfqs WHERE status = "quoted"')->fetchColumn();
    $rfqContracted = (int)$db->query('SELECT COUNT(*) FROM rfqs WHERE status = "contracted"')->fetchColumn();
    $rfqRejected = (int)$db->query('SELECT COUNT(*) FROM rfqs WHERE status = "rejected"')->fetchColumn();

    $prodTotal = (int)$db->query('SELECT COUNT(*) FROM products')->fetchColumn();
    $prodPub = (int)$db->query('SELECT COUNT(*) FROM products WHERE is_published = 1')->fetchColumn();
    $contactTotal = (int)$db->query('SELECT COUNT(*) FROM contacts')->fetchColumn();
    $contactUnread = (int)$db->query('SELECT COUNT(*) FROM contacts WHERE status = "unread"')->fetchColumn();

    $recent = $db->query('SELECT id, tracking_code as trackingCode, full_name as fullName, company_name as companyName, project_type as projectType, status, created_at as createdAt FROM rfqs ORDER BY created_at DESC LIMIT 5')->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => [
            'rfqs' => [
                'total' => $rfqTotal,
                'pending' => $rfqPending,
                'reviewing' => $rfqReviewing,
                'quoted' => $rfqQuoted,
                'contracted' => $rfqContracted,
                'rejected' => $rfqRejected
            ],
            'products' => ['total' => $prodTotal, 'published' => $prodPub],
            'contacts' => ['total' => $contactTotal, 'unread' => $contactUnread],
            'recentRfqs' => $recent
        ]
    ]);
    exit;
}

// 404 Route Not Found
http_response_code(404);
echo json_encode(['success' => false, 'error' => 'API endpoint not found: ' . $route]);
