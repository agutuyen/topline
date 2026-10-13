import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  Edit3,
  FileText,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Language, ProductItem, CollectionGroup } from '../../types';
import {
  adminLogin,
  adminGetStats,
  adminGetRfqs,
  adminUpdateRfqStatus,
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminToggleProductStatus,
  adminGetCollections,
  adminUpdateCollection,
  adminGetContacts,
  adminUpdateContactStatus,
  getAuthToken,
  removeAuthToken,
  DashboardStats,
  RfqRecord,
  ContactRecord,
} from '../../services/api';

interface AdminPortalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

type AdminTab = 'overview' | 'rfqs' | 'products' | 'collections' | 'contacts';

export default function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('TopLine@2026!');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [rfqs, setRfqs] = useState<RfqRecord[]>([]);
  const [selectedRfq, setSelectedRfq] = useState<RfqRecord | null>(null);
  const [rfqFilterStatus, setRfqFilterStatus] = useState<string>('all');
  const [rfqSearch, setRfqSearch] = useState<string>('');

  // Products State
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productSearch, setProductSearch] = useState<string>('');
  const [productCatFilter, setProductCatFilter] = useState<string>('all');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Collections State
  const [collections, setCollections] = useState<CollectionGroup[]>([]);
  const [editingCollection, setEditingCollection] = useState<CollectionGroup | null>(null);

  // Form Edit State for Products
  const [productForm, setProductForm] = useState({
    sku: '',
    collectionId: 'warm-wood',
    nameVi: '',
    nameEn: '',
    dimensions: '',
    dimensionsCm: '',
    materialsVi: '',
    materialsEn: '',
    finishVi: '',
    finishEn: '',
    colorVi: '',
    colorEn: '',
    hardwareVi: '',
    hardwareEn: '',
    designStyleVi: '',
    designStyleEn: '',
    descriptionVi: '',
    descriptionEn: '',
    image: '',
    cutoutImage: '',
    isPublished: true,
  });

  // Form Edit State for Collections
  const [collectionForm, setCollectionForm] = useState({
    number: '',
    titleVi: '',
    titleEn: '',
    subtitleVi: '',
    subtitleEn: '',
    pieces: '',
    materialsSummaryVi: '',
    materialsSummaryEn: '',
    overviewImage: '',
    detailImage: '',
  });

  const [formLangTab, setFormLangTab] = useState<'vi' | 'en'>('vi');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Lock body scroll when admin portal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (isAuthenticated) {
        loadDashboardData();
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isAuthenticated]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, rfqsData, prodsData, contactsData, colsData] = await Promise.all([
        adminGetStats(),
        adminGetRfqs(),
        adminGetProducts(),
        adminGetContacts(),
        adminGetCollections(),
      ]);
      setStats(statsData);
      setRfqs(rfqsData);
      setProducts(prodsData);
      setContacts(contactsData);
      setCollections(colsData);
    } catch {
      // If unauthorized, reset login
      removeAuthToken();
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      await adminLogin(username, password);
      setIsAuthenticated(true);
      loadDashboardData();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Đăng nhập không thành công');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
  };

  const handleUpdateRfqStatus = async (rfqId: string, newStatus: string) => {
    try {
      await adminUpdateRfqStatus(rfqId, newStatus);
      setRfqs((prev) => prev.map((r) => (r.id === rfqId ? { ...r, status: newStatus } : r)));
      if (selectedRfq && selectedRfq.id === rfqId) {
        setSelectedRfq((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      adminGetStats().then(setStats).catch(() => {});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Cập nhật thất bại');
    }
  };

  const handleToggleProduct = async (id: string, currentStatus: boolean) => {
    try {
      await adminToggleProductStatus(id, !currentStatus);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublished: !currentStatus } : p))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Cập nhật thất bại');
    }
  };

  const handleDeleteProduct = async (id: string, sku: string) => {
    if (!confirm(`Xác nhận xóa sản phẩm ${sku}?`)) return;
    try {
      await adminDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      adminGetStats().then(setStats).catch(() => {});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Xóa thất bại');
    }
  };

  // Open Edit Product Modal
  const openEditProduct = (p: ProductItem) => {
    setEditingProduct(p);
    setProductForm({
      sku: p.sku,
      collectionId: String(p.collectionId || p.category || 'warm-wood'),
      nameVi: p.name.vi,
      nameEn: p.name.en,
      dimensions: p.dimensions,
      dimensionsCm: p.dimensionsCm || '',
      materialsVi: p.materials.vi,
      materialsEn: p.materials.en,
      finishVi: p.finish.vi,
      finishEn: p.finish.en,
      colorVi: p.color?.vi || '',
      colorEn: p.color?.en || '',
      hardwareVi: p.hardware?.vi || '',
      hardwareEn: p.hardware?.en || '',
      designStyleVi: p.designStyle?.vi || '',
      designStyleEn: p.designStyle?.en || '',
      descriptionVi: p.description.vi,
      descriptionEn: p.description.en,
      image: p.image,
      cutoutImage: p.cutoutImage || '',
      isPublished: p.isPublished !== false,
    });
    setFormLangTab('vi');
    setSaveSuccessMessage('');
  };

  // Open Create Product Modal
  const openCreateProduct = () => {
    setIsAddProductOpen(true);
    setProductForm({
      sku: `TL-NEW-${Math.floor(10 + Math.random() * 90)}`,
      collectionId: 'warm-wood',
      nameVi: '',
      nameEn: '',
      dimensions: 'W1200 x D450 x H750 mm',
      dimensionsCm: '120 x 45 x 75 cm',
      materialsVi: 'Gỗ sồi tự nhiên & đá cẩm thạch',
      materialsEn: 'Natural White Oak & Marble Top',
      finishVi: 'Sơn PU mờ bảo vệ chống ẩm',
      finishEn: 'Matte polyurethane finish',
      colorVi: 'Nâu sồi tự nhiên',
      colorEn: 'Natural Warm Oak',
      hardwareVi: 'Phụ kiện kim khí đồng thau',
      hardwareEn: 'Antique brass metal pulls',
      designStyleVi: 'Modern Luxury',
      designStyleEn: 'Contemporary Architectural',
      descriptionVi: '',
      descriptionEn: '',
      image: '/images/products/TL-WW-01_Credenza_Cabinet.png',
      cutoutImage: '/images/products/cutouts/TL-WW-01_Credenza_Cabinet.png',
      isPublished: true,
    });
    setFormLangTab('vi');
    setSaveSuccessMessage('');
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccessMessage('');

    const payload = {
      sku: productForm.sku,
      collectionId: productForm.collectionId,
      collection_id: productForm.collectionId,
      name: { vi: productForm.nameVi, en: productForm.nameEn },
      name_vi: productForm.nameVi,
      name_en: productForm.nameEn,
      dimensions: productForm.dimensions,
      dimensionsCm: productForm.dimensionsCm,
      dimensions_cm: productForm.dimensionsCm,
      materials: { vi: productForm.materialsVi, en: productForm.materialsEn },
      materials_vi: productForm.materialsVi,
      materials_en: productForm.materialsEn,
      finish: { vi: productForm.finishVi, en: productForm.finishEn },
      finish_vi: productForm.finishVi,
      finish_en: productForm.finishEn,
      color: { vi: productForm.colorVi, en: productForm.colorEn },
      color_vi: productForm.colorVi,
      color_en: productForm.colorEn,
      hardware: { vi: productForm.hardwareVi, en: productForm.hardwareEn },
      hardware_vi: productForm.hardwareVi,
      hardware_en: productForm.hardwareEn,
      designStyle: { vi: productForm.designStyleVi, en: productForm.designStyleEn },
      design_style_vi: productForm.designStyleVi,
      design_style_en: productForm.designStyleEn,
      description: { vi: productForm.descriptionVi, en: productForm.descriptionEn },
      description_vi: productForm.descriptionVi,
      description_en: productForm.descriptionEn,
      image: productForm.image,
      cutoutImage: productForm.cutoutImage,
      cutout_image: productForm.cutoutImage,
      isPublished: productForm.isPublished,
      is_published: productForm.isPublished ? 1 : 0,
    };

    try {
      if (editingProduct) {
        const updated = await adminUpdateProduct(editingProduct.id, payload);
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setSaveSuccessMessage('Đã cập nhật sản phẩm thành công!');
        setTimeout(() => {
          setEditingProduct(null);
        }, 800);
      } else if (isAddProductOpen) {
        const created = await adminCreateProduct(payload);
        setProducts((prev) => [created, ...prev]);
        setSaveSuccessMessage('Đã tạo sản phẩm mới thành công!');
        setTimeout(() => {
          setIsAddProductOpen(false);
        }, 800);
      }
      adminGetStats().then(setStats).catch(() => {});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi khi lưu sản phẩm');
    } finally {
      setIsSaving(false);
    }
  };

  // Open Edit Collection Modal
  const openEditCollection = (c: CollectionGroup) => {
    setEditingCollection(c);
    setCollectionForm({
      number: c.number,
      titleVi: c.title.vi,
      titleEn: c.title.en,
      subtitleVi: c.subtitle.vi,
      subtitleEn: c.subtitle.en,
      pieces: c.pieces,
      materialsSummaryVi: c.materialsSummary?.vi || '',
      materialsSummaryEn: c.materialsSummary?.en || '',
      overviewImage: c.overviewImage,
      detailImage: c.detailImage || '',
    });
    setFormLangTab('vi');
    setSaveSuccessMessage('');
  };

  // Save Collection
  const handleSaveCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection) return;
    setIsSaving(true);
    setSaveSuccessMessage('');

    const payload = {
      number: collectionForm.number,
      title: { vi: collectionForm.titleVi, en: collectionForm.titleEn },
      title_vi: collectionForm.titleVi,
      title_en: collectionForm.titleEn,
      subtitle: { vi: collectionForm.subtitleVi, en: collectionForm.subtitleEn },
      subtitle_vi: collectionForm.subtitleVi,
      subtitle_en: collectionForm.subtitleEn,
      pieces: collectionForm.pieces,
      pieces_summary: collectionForm.pieces,
      materialsSummary: { vi: collectionForm.materialsSummaryVi, en: collectionForm.materialsSummaryEn },
      materials_summary_vi: collectionForm.materialsSummaryVi,
      materials_summary_en: collectionForm.materialsSummaryEn,
      overviewImage: collectionForm.overviewImage,
      overview_image: collectionForm.overviewImage,
      detailImage: collectionForm.detailImage,
      detail_image: collectionForm.detailImage,
    };

    try {
      const updated = await adminUpdateCollection(editingCollection.id, payload);
      setCollections((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setSaveSuccessMessage('Đã cập nhật bộ sưu tập thành công!');
      setTimeout(() => {
        setEditingCollection(null);
      }, 800);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi khi lưu bộ sưu tập');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex flex-col bg-[#0F0E0D] text-white animate-fadeIn select-none"
    >
      {/* Top Admin Bar */}
      <header className="px-6 py-3.5 bg-[#181615] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C5A880] text-[#191919] font-serif font-bold text-xs flex items-center justify-center">
            TL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-medium tracking-wider">TopLine Admin Portal</span>
              <span className="px-2 py-0.5 rounded-sm bg-white/10 text-[9px] font-mono text-[#C5A880] uppercase">
                ECC Architecture
              </span>
            </div>
            <span className="text-[10px] text-white/40 font-mono block">
              Node 24 · SQLite Database Layer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-xs font-mono text-white/80 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#C5A880] hover:bg-white text-[#191919] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Website</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      {!isAuthenticated ? (
        /* Login Screen */
        <div className="flex-1 flex items-center justify-center p-4 bg-[#0F0E0D]">
          <div className="w-full max-w-md p-8 rounded-3xl bg-[#181615] border border-white/15 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A880]">
                QUẢN TRỊ NỘI THẤT MAY ĐO
              </span>
              <h2 className="font-serif text-3xl font-normal text-white">Đăng Nhập Hệ Thống</h2>
              <p className="text-xs text-white/60 font-light">
                Quản lý 29 sản phẩm, 6 bộ sưu tập và yêu cầu báo giá dự án (RFQ)
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Tài khoản / Email:</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-hidden focus:border-[#C5A880] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Mật khẩu:</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-hidden focus:border-[#C5A880] transition-colors"
                />
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-white/60">
                <span>Tài khoản mặc định: </span>
                <span className="text-[#C5A880] font-bold">admin</span> /{' '}
                <span className="text-[#C5A880] font-bold">TopLine@2026!</span>
              </div>

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 rounded-xl bg-[#C5A880] hover:bg-white text-[#191919] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loggingIn ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard Layout */
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0F0E0D]">
          {/* Left Navigation Sidebar */}
          <aside className="w-full md:w-64 bg-[#141312] border-r border-white/10 flex flex-col justify-between shrink-0">
            <div className="p-4 space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Tổng Quan (Overview)</span>
              </button>

              <button
                onClick={() => setActiveTab('rfqs')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'rfqs'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>Báo Giá (RFQs)</span>
                </div>
                {stats && stats.rfqs.pending > 0 && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-mono">
                    {stats.rfqs.pending}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Sản Phẩm (29 SKU)</span>
              </button>

              {/* NEW: Collections Tab */}
              <button
                onClick={() => setActiveTab('collections')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'collections'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Bộ Sưu Tập (6 BST)</span>
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Liên Hệ Khách</span>
              </button>
            </div>

            <div className="p-4 border-t border-white/10 text-[11px] font-mono text-white/40 space-y-1">
              <div>Pháp nhân: TOPLINE HOSPITALITY</div>
              <div>MST: 3703519683</div>
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {activeTab === 'overview' && 'Bảng Điều Khiển Tổng Quan'}
                  {activeTab === 'rfqs' && 'Quản Lý Hồ Sơ Báo Giá Dự Án (RFQ)'}
                  {activeTab === 'products' && 'Quản Lý & Chỉnh Sửa 29 Sản Phẩm'}
                  {activeTab === 'collections' && 'Quản Lý 6 Bộ Sưu Tập Thiết Kế'}
                  {activeTab === 'contacts' && 'Hộp Thư Liên Hệ Khách Hàng'}
                </h1>
                <span className="text-xs text-white/50 font-light">
                  {activeTab === 'overview' && 'Theo dõi tiến độ báo giá, năng lực sản xuất và thông báo'}
                  {activeTab === 'rfqs' && 'Rà soát bản vẽ kỹ thuật CAD/DWG/BOQ và phân loại trạng thái'}
                  {activeTab === 'products' && 'Chỉnh sửa thông số song ngữ, quy cách mm, vật liệu & hình ảnh'}
                  {activeTab === 'collections' && 'Chỉnh sửa thông điệp thiết kế, hình ảnh tổng thể và vật liệu đại diện'}
                  {activeTab === 'contacts' && 'Tin nhắn trao đổi trực tiếp từ khách hàng'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={loadDashboardData}
                  disabled={loading}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Tải lại dữ liệu"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                {activeTab === 'products' && (
                  <button
                    onClick={openCreateProduct}
                    className="px-4 py-2 rounded-xl bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm hover:bg-white"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Sản Phẩm Mới</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-6">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Tổng Hồ Sơ Báo Giá</span>
                    <div className="font-serif text-3xl font-medium text-[#C5A880]">{stats.rfqs.total}</div>
                    <span className="text-[11px] text-amber-400 font-mono block">
                      {stats.rfqs.pending} hồ sơ chờ xử lý
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Sản Phẩm Đang Hoạt Động</span>
                    <div className="font-serif text-3xl font-medium text-white">{stats.products.published}</div>
                    <span className="text-[11px] text-white/50 font-mono block">Trên tổng số 29 SKU</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Bộ Sưu Tập Chính Thức</span>
                    <div className="font-serif text-3xl font-medium text-[#C5A880]">6</div>
                    <span className="text-[11px] text-white/50 font-mono block">Cho phép chỉnh sửa</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Liên Hệ Chưa Đọc</span>
                    <div className="font-serif text-3xl font-medium text-emerald-400">{stats.contacts.unread || 0}</div>
                    <span className="text-[11px] text-white/50 font-mono block">Tổng: {stats.contacts.total} thư</span>
                  </div>
                </div>

                {/* Recent RFQ Table */}
                <div className="p-6 rounded-3xl bg-[#181615] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-normal text-white">Yêu Cầu Báo Giá Gần Đây</h3>
                    <button
                      onClick={() => setActiveTab('rfqs')}
                      className="text-xs font-mono text-[#C5A880] hover:underline cursor-pointer"
                    >
                      Xem tất cả →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-white/50 font-mono uppercase text-[10px]">
                          <th className="pb-3">Mã Hồ Sơ</th>
                          <th className="pb-3">Khách Hàng / Đơn Vị</th>
                          <th className="pb-3">Loại Hình</th>
                          <th className="pb-3">Trạng Thái</th>
                          <th className="pb-3">Thời Gian</th>
                          <th className="pb-3 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {stats.recentRfqs.map((r) => (
                          <tr key={r.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 font-mono font-bold text-[#C5A880]">{r.trackingCode}</td>
                            <td className="py-3">
                              <span className="font-medium text-white block">{r.fullName}</span>
                              <span className="text-[11px] text-white/50">{r.companyName || 'Dự án riêng'}</span>
                            </td>
                            <td className="py-3 font-mono capitalize">{r.projectType}</td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase ${
                                  r.status === 'pending'
                                    ? 'bg-amber-900/40 text-amber-300 border border-amber-500/30'
                                    : r.status === 'reviewing'
                                    ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30'
                                    : r.status === 'quoted'
                                    ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                                    : 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {r.status}
                              </span>
                            </td>
                            <td className="py-3 text-white/50 font-mono text-[11px]">{r.createdAt}</td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => {
                                  const full = rfqs.find((item) => item.id === r.id);
                                  if (full) setSelectedRfq(full);
                                  setActiveTab('rfqs');
                                }}
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] font-mono text-[11px] transition-colors cursor-pointer"
                              >
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RFQ MANAGEMENT */}
            {activeTab === 'rfqs' && (
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
                    {['all', 'pending', 'reviewing', 'quoted', 'contracted'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setRfqFilterStatus(st)}
                        className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer uppercase text-[10px] ${
                          rfqFilterStatus === st
                            ? 'bg-[#C5A880] text-[#191919] font-bold border-[#C5A880]'
                            : 'border-white/15 text-white/70 hover:bg-white/5'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tìm mã RFQ, tên, số ĐT..."
                      value={rfqSearch}
                      onChange={(e) => setRfqSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#181615] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* RFQs List Table */}
                <div className="rounded-2xl bg-[#181615] border border-white/10 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40 text-white/50 font-mono uppercase text-[10px]">
                        <th className="p-4">Mã RFQ</th>
                        <th className="p-4">Người Liên Hệ</th>
                        <th className="p-4">Điện Thoại / Email</th>
                        <th className="p-4">Sản Phẩm & Bản Vẽ</th>
                        <th className="p-4">Trạng Thái</th>
                        <th className="p-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {rfqs
                        .filter((r) => rfqFilterStatus === 'all' || r.status === rfqFilterStatus)
                        .filter(
                          (r) =>
                            !rfqSearch ||
                            r.trackingCode.toLowerCase().includes(rfqSearch.toLowerCase()) ||
                            r.fullName.toLowerCase().includes(rfqSearch.toLowerCase()) ||
                            r.phone.includes(rfqSearch)
                        )
                        .map((r) => (
                          <tr key={r.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-mono font-bold text-[#C5A880]">{r.trackingCode}</td>
                            <td className="p-4">
                              <span className="font-semibold text-white block">{r.fullName}</span>
                              <span className="text-[11px] text-white/50">{r.companyName || 'Khách riêng'}</span>
                            </td>
                            <td className="p-4 font-mono">
                              <div className="text-white">{r.phone}</div>
                              <div className="text-white/50 text-[11px]">{r.email}</div>
                            </td>
                            <td className="p-4">
                              <div className="text-xs text-white/80">
                                {r.selectedProducts.length} sản phẩm chọn
                              </div>
                              <div className="text-[11px] text-[#C5A880]">
                                📎 {r.attachments.length} bản vẽ đính kèm
                              </div>
                            </td>
                            <td className="p-4">
                              <select
                                value={r.status}
                                onChange={(e) => handleUpdateRfqStatus(r.id, e.target.value)}
                                className="px-2 py-1 rounded bg-black/40 border border-white/20 text-[11px] font-mono uppercase focus:outline-hidden"
                              >
                                <option value="pending">🟡 Chờ xử lý</option>
                                <option value="reviewing">🔵 Đang rà soát</option>
                                <option value="quoted">🟣 Đã báo giá</option>
                                <option value="contracted">🟢 Chốt hợp đồng</option>
                                <option value="rejected">🔴 Không khả thi</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => setSelectedRfq(r)}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] font-mono text-xs transition-colors cursor-pointer"
                              >
                                Xem Chi Tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS MANAGEMENT (WITH EDIT & CREATE ACTIONS) */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                {/* Search & Category Filter */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
                    {[
                      { id: 'all', label: 'Tất cả (29)' },
                      { id: 'warm-wood', label: '01. Gỗ Ấm' },
                      { id: 'black-contemporary', label: '02. Đen Kiến Trúc' },
                      { id: 'sculptural', label: '03. Điêu Khắc' },
                      { id: 'dining-accent', label: '04. Bàn Ăn' },
                      { id: 'marlow-oak', label: '05. Marlow' },
                      { id: 'burl-oak', label: '06. Burl Oak' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setProductCatFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer uppercase text-[10px] ${
                          productCatFilter === cat.id
                            ? 'bg-[#C5A880] text-[#191919] font-bold border-[#C5A880]'
                            : 'border-white/15 text-white/70 hover:bg-white/5'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tìm SKU, tên, vật liệu..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#181615] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                {/* Products Table with Edit Buttons */}
                <div className="rounded-2xl bg-[#181615] border border-white/10 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40 text-white/50 font-mono uppercase text-[10px]">
                        <th className="p-4">Ảnh</th>
                        <th className="p-4">SKU</th>
                        <th className="p-4">Tên Sản Phẩm (VI / EN)</th>
                        <th className="p-4">Kích Thước</th>
                        <th className="p-4">Bộ Sưu Tập</th>
                        <th className="p-4">Hiển Thị</th>
                        <th className="p-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products
                        .filter((p) => productCatFilter === 'all' || p.category === productCatFilter)
                        .filter(
                          (p) =>
                            !productSearch ||
                            p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                            p.name.vi.toLowerCase().includes(productSearch.toLowerCase()) ||
                            p.name.en.toLowerCase().includes(productSearch.toLowerCase())
                        )
                        .map((p) => (
                          <tr key={p.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="w-12 h-12 rounded-lg bg-white p-1 overflow-hidden">
                                <img src={p.image} alt={p.sku} className="w-full h-full object-contain" />
                              </div>
                            </td>
                            <td className="p-4 font-mono font-bold text-[#C5A880]">{p.sku}</td>
                            <td className="p-4">
                              <span className="font-semibold text-white block">{p.name.vi}</span>
                              <span className="text-[11px] text-white/50 italic">{p.name.en}</span>
                            </td>
                            <td className="p-4 font-mono text-[11px] text-white/70">{p.dimensions}</td>
                            <td className="p-4 font-mono text-[11px] text-[#A68A56]">{p.categoryLabel.vi}</td>
                            <td className="p-4">
                              <button
                                onClick={() => handleToggleProduct(p.id, Boolean(p.isPublished ?? true))}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase cursor-pointer transition-colors ${
                                  p.isPublished !== false
                                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-red-900/40 text-red-300 border border-red-500/30'
                                }`}
                              >
                                {p.isPublished !== false ? 'Hiển thị' : 'Ẩn'}
                              </button>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              {/* EDIT PRODUCT BUTTON */}
                              <button
                                onClick={() => openEditProduct(p)}
                                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] font-mono text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                                title="Chỉnh sửa chi tiết sản phẩm"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Sửa</span>
                              </button>

                              {/* DELETE PRODUCT BUTTON */}
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.sku)}
                                className="p-1.5 rounded bg-red-900/30 hover:bg-red-800 text-red-300 transition-colors cursor-pointer inline-flex items-center"
                                title="Xóa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: COLLECTIONS MANAGEMENT (WITH EDIT ACTION) */}
            {activeTab === 'collections' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collections.map((col) => (
                    <div
                      key={col.id}
                      className="p-6 rounded-3xl bg-[#181615] border border-white/10 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        {/* Top Badge & Number */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                          <span className="text-[#C5A880] font-bold">COLLECTION {col.number}</span>
                          <span className="text-white/40">ID: {col.id}</span>
                        </div>

                        {/* Image & Titles */}
                        <div className="mt-4 flex gap-4">
                          <div className="w-28 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10">
                            <img
                              src={col.overviewImage}
                              alt={col.title.vi}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg font-normal text-white">
                              {col.title.vi}
                            </h3>
                            <h4 className="font-serif text-xs italic text-white/50">
                              {col.title.en}
                            </h4>
                            <p className="mt-2 text-xs text-white/70 line-clamp-2 font-light">
                              {col.subtitle.vi}
                            </p>
                          </div>
                        </div>

                        {/* Pieces Summary */}
                        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-white/70">
                          <span className="text-white/40 block text-[9px] uppercase">Hạng mục chính:</span>
                          <span className="text-[#C5A880]">{col.pieces}</span>
                        </div>
                      </div>

                      {/* Edit Collection Button */}
                      <button
                        onClick={() => openEditCollection(col)}
                        className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Chỉnh Sửa Bộ Sưu Tập</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CONTACTS */}
            {activeTab === 'contacts' && (
              <div className="rounded-2xl bg-[#181615] border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 text-white/50 font-mono uppercase text-[10px]">
                      <th className="p-4">Thời Gian</th>
                      <th className="p-4">Người Gửi</th>
                      <th className="p-4">Điện Thoại / Email</th>
                      <th className="p-4">Nội Dung Tin Nhắn</th>
                      <th className="p-4">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-[11px] text-white/50">{c.createdAt}</td>
                        <td className="p-4 font-semibold text-white">{c.fullName}</td>
                        <td className="p-4 font-mono">
                          <div>{c.phone || '―'}</div>
                          <div className="text-white/50 text-[11px]">{c.email}</div>
                        </td>
                        <td className="p-4 max-w-md text-white/80">{c.message}</td>
                        <td className="p-4">
                          <button
                            onClick={async () => {
                              const newSt = c.status === 'read' ? 'unread' : 'read';
                              await adminUpdateContactStatus(c.id, newSt);
                              setContacts((prev) =>
                                prev.map((item) => (item.id === c.id ? { ...item, status: newSt } : item))
                              );
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase cursor-pointer ${
                              c.status === 'read' ? 'bg-white/10 text-white/60' : 'bg-emerald-900/40 text-emerald-300'
                            }`}
                          >
                            {c.status === 'read' ? 'Đã xem' : 'Mới'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ── PRODUCT EDIT / CREATE MODAL (BILINGUAL FORM) ── */}
      {(editingProduct || isAddProductOpen) && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => {
            setEditingProduct(null);
            setIsAddProductOpen(false);
          }}
        >
          <div
            data-lenis-prevent
            className="w-full max-w-3xl bg-[#181615] rounded-3xl border border-white/20 p-6 sm:p-8 space-y-5 text-white max-h-[92vh] flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                  {editingProduct ? `CHỈNH SỬA SẢN PHẨM: ${editingProduct.sku}` : 'THÊM MỚI SẢN PHẨM MAY ĐO'}
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  {editingProduct ? productForm.nameVi || productForm.sku : 'Thông Số Sản Phẩm Mới'}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Language Tab Switcher inside Form */}
                <div className="flex rounded-lg bg-black/50 p-1 border border-white/15 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setFormLangTab('vi')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      formLangTab === 'vi' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormLangTab('en')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      formLangTab === 'en' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    English
                  </button>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddProductOpen(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {saveSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono">
                ✓ {saveSuccessMessage}
              </div>
            )}

            {/* Scrollable Form Body */}
            <form
              id="product-edit-form"
              onSubmit={handleSaveProduct}
              className="flex-1 overflow-y-auto overscroll-contain space-y-4 pr-1 text-xs"
            >
              {/* Row 1: SKU & Collection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-white/70 mb-1">Mã SKU *:</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-white/70 mb-1">Thuộc Bộ Sưu Tập *:</label>
                  <select
                    value={productForm.collectionId}
                    onChange={(e) => setProductForm({ ...productForm, collectionId: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                  >
                    <option value="warm-wood">01. Warm Wood + Dark Stone</option>
                    <option value="black-contemporary">02. Black Contemporary</option>
                    <option value="sculptural">03. Sculptural Stone + Wood</option>
                    <option value="dining-accent">04. Dining & Accent Collection</option>
                    <option value="marlow-oak">05. Stanley Marlow Oak</option>
                    <option value="burl-oak">06. Stanley Burl Oak Dark</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Product Name (VI or EN based on tab) */}
              {formLangTab === 'vi' ? (
                <div>
                  <label className="block font-mono text-white/70 mb-1">Tên sản phẩm (Tiếng Việt) *:</label>
                  <input
                    type="text"
                    required
                    value={productForm.nameVi}
                    onChange={(e) => setProductForm({ ...productForm, nameVi: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-mono text-white/70 mb-1">Product Name (English) *:</label>
                  <input
                    type="text"
                    required
                    value={productForm.nameEn}
                    onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
              )}

              {/* Row 3: Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-white/70 mb-1">Kích thước (mm) *:</label>
                  <input
                    type="text"
                    required
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                    placeholder="W1200 x D450 x H750 mm"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-white/70 mb-1">Quy cách (cm):</label>
                  <input
                    type="text"
                    value={productForm.dimensionsCm}
                    onChange={(e) => setProductForm({ ...productForm, dimensionsCm: e.target.value })}
                    placeholder="120 x 45 x 75 cm"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Row 4: Materials & Finish (Bilingual tab) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-white/70 mb-1">
                    {formLangTab === 'vi' ? 'Vật liệu chính (VI):' : 'Primary Materials (EN):'}
                  </label>
                  <input
                    type="text"
                    value={formLangTab === 'vi' ? productForm.materialsVi : productForm.materialsEn}
                    onChange={(e) =>
                      formLangTab === 'vi'
                        ? setProductForm({ ...productForm, materialsVi: e.target.value })
                        : setProductForm({ ...productForm, materialsEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-white/70 mb-1">
                    {formLangTab === 'vi' ? 'Hoàn thiện bề mặt (VI):' : 'Surface Finish (EN):'}
                  </label>
                  <input
                    type="text"
                    value={formLangTab === 'vi' ? productForm.finishVi : productForm.finishEn}
                    onChange={(e) =>
                      formLangTab === 'vi'
                        ? setProductForm({ ...productForm, finishVi: e.target.value })
                        : setProductForm({ ...productForm, finishEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Row 5: Hardware & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-white/70 mb-1">
                    {formLangTab === 'vi' ? 'Phụ kiện kim khí (VI):' : 'Hardware (EN):'}
                  </label>
                  <input
                    type="text"
                    value={formLangTab === 'vi' ? productForm.hardwareVi : productForm.hardwareEn}
                    onChange={(e) =>
                      formLangTab === 'vi'
                        ? setProductForm({ ...productForm, hardwareVi: e.target.value })
                        : setProductForm({ ...productForm, hardwareEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-white/70 mb-1">
                    {formLangTab === 'vi' ? 'Bảng màu (VI):' : 'Color Palette (EN):'}
                  </label>
                  <input
                    type="text"
                    value={formLangTab === 'vi' ? productForm.colorVi : productForm.colorEn}
                    onChange={(e) =>
                      formLangTab === 'vi'
                        ? setProductForm({ ...productForm, colorVi: e.target.value })
                        : setProductForm({ ...productForm, colorEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Row 6: Description */}
              <div>
                <label className="block font-mono text-white/70 mb-1">
                  {formLangTab === 'vi' ? 'Mô tả công năng & thiết kế (VI):' : 'Description & Narrative (EN):'}
                </label>
                <textarea
                  rows={3}
                  value={formLangTab === 'vi' ? productForm.descriptionVi : productForm.descriptionEn}
                  onChange={(e) =>
                    formLangTab === 'vi'
                      ? setProductForm({ ...productForm, descriptionVi: e.target.value })
                      : setProductForm({ ...productForm, descriptionEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              {/* Row 7: Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-white/70 mb-1">Đường dẫn ảnh chính (1:1):</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-white/70 mb-1">Ảnh tách nền (Cutout PNG):</label>
                  <input
                    type="text"
                    value={productForm.cutoutImage}
                    onChange={(e) => setProductForm({ ...productForm, cutoutImage: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Row 8: Published toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="prod-published"
                  checked={productForm.isPublished}
                  onChange={(e) => setProductForm({ ...productForm, isPublished: e.target.checked })}
                  className="rounded border-white/20 text-[#C5A880] focus:ring-[#C5A880]"
                />
                <label htmlFor="prod-published" className="font-mono text-white/80 cursor-pointer">
                  Kích hoạt hiển thị công khai trên website
                </label>
              </div>
            </form>

            {/* Pinned Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddProductOpen(false);
                }}
                className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 text-xs font-mono transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                form="product-edit-form"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#C5A880] hover:bg-white text-[#191919] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi CSDL'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── COLLECTION EDIT MODAL (BILINGUAL) ── */}
      {editingCollection && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setEditingCollection(null)}
        >
          <div
            data-lenis-prevent
            className="w-full max-w-2xl bg-[#181615] rounded-3xl border border-white/20 p-6 sm:p-8 space-y-5 text-white max-h-[92vh] flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                  CHỈNH SỬA BỘ SƯU TẬP {collectionForm.number}
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  {collectionForm.titleVi}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex rounded-lg bg-black/50 p-1 border border-white/15 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setFormLangTab('vi')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      formLangTab === 'vi' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormLangTab('en')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      formLangTab === 'en' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    English
                  </button>
                </div>

                <button
                  onClick={() => setEditingCollection(null)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {saveSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono">
                ✓ {saveSuccessMessage}
              </div>
            )}

            {/* Scrollable Form Body */}
            <form
              id="col-edit-form"
              onSubmit={handleSaveCollection}
              className="flex-1 overflow-y-auto overscroll-contain space-y-4 pr-1 text-xs"
            >
              <div>
                <label className="block font-mono text-white/70 mb-1">
                  {formLangTab === 'vi' ? 'Tên bộ sưu tập (Tiếng Việt) *:' : 'Collection Title (English) *:'}
                </label>
                <input
                  type="text"
                  required
                  value={formLangTab === 'vi' ? collectionForm.titleVi : collectionForm.titleEn}
                  onChange={(e) =>
                    formLangTab === 'vi'
                      ? setCollectionForm({ ...collectionForm, titleVi: e.target.value })
                      : setCollectionForm({ ...collectionForm, titleEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">
                  {formLangTab === 'vi' ? 'Mô tả triết lý & phong cách (Tiếng Việt):' : 'Design Philosophy & Subtitle (English):'}
                </label>
                <textarea
                  rows={3}
                  value={formLangTab === 'vi' ? collectionForm.subtitleVi : collectionForm.subtitleEn}
                  onChange={(e) =>
                    formLangTab === 'vi'
                      ? setCollectionForm({ ...collectionForm, subtitleVi: e.target.value })
                      : setCollectionForm({ ...collectionForm, subtitleEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">Tóm tắt các hạng mục trong bộ (Pieces Summary):</label>
                <input
                  type="text"
                  value={collectionForm.pieces}
                  onChange={(e) => setCollectionForm({ ...collectionForm, pieces: e.target.value })}
                  placeholder="CREDENZA | DRESSER | NIGHTSTAND..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">
                  {formLangTab === 'vi' ? 'Tóm tắt vật liệu đặc trưng (VI):' : 'Key Materials Summary (EN):'}
                </label>
                <input
                  type="text"
                  value={formLangTab === 'vi' ? collectionForm.materialsSummaryVi : collectionForm.materialsSummaryEn}
                  onChange={(e) =>
                    formLangTab === 'vi'
                      ? setCollectionForm({ ...collectionForm, materialsSummaryVi: e.target.value })
                      : setCollectionForm({ ...collectionForm, materialsSummaryEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">Đường dẫn ảnh tổng thể (Overview Board Image):</label>
                <input
                  type="text"
                  value={collectionForm.overviewImage}
                  onChange={(e) => setCollectionForm({ ...collectionForm, overviewImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono focus:border-[#C5A880]"
                />
              </div>
            </form>

            {/* Pinned Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setEditingCollection(null)}
                className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 text-xs font-mono transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                form="col-edit-form"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#C5A880] hover:bg-white text-[#191919] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi BST'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RFQ DETAIL INSPECTION MODAL ── */}
      {selectedRfq && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedRfq(null)}
        >
          <div
            data-lenis-prevent
            className="w-full max-w-2xl bg-[#181615] rounded-3xl border border-white/20 p-6 sm:p-8 space-y-5 text-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                  HỒ SƠ BÁO GIÁ DỰ ÁN
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">{selectedRfq.trackingCode}</h3>
              </div>
              <button
                onClick={() => setSelectedRfq(null)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-white/40 block text-[10px]">KHÁCH HÀNG:</span>
                <span className="font-bold text-white text-sm">{selectedRfq.fullName}</span>
                <span className="text-white/60 block">{selectedRfq.companyName || 'Dự án riêng'}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-white/40 block text-[10px]">LIÊN LẠC:</span>
                <span className="text-[#C5A880] font-bold text-sm block">{selectedRfq.phone}</span>
                <span className="text-white/60">{selectedRfq.email}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1">
              <span className="text-white/40 font-mono text-[10px] block">YÊU CẦU & GHI CHÚ DỰ ÁN:</span>
              <p className="text-white/90 leading-relaxed">{selectedRfq.notes || 'Không có ghi chú thêm.'}</p>
            </div>

            {/* Attached drawings / files */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#C5A880] block">
                Bản vẽ đính kèm ({selectedRfq.attachments.length} tệp):
              </span>
              <div className="space-y-1.5">
                {selectedRfq.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono"
                  >
                    <span>📎 {att.fileName}</span>
                    <a
                      href={att.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded bg-[#C5A880] text-[#191919] font-bold text-[11px] hover:bg-white transition-colors"
                    >
                      Tải về / Xem
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span>Trạng thái:</span>
                <select
                  value={selectedRfq.status}
                  onChange={(e) => handleUpdateRfqStatus(selectedRfq.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/20 text-xs font-mono uppercase text-[#C5A880]"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="reviewing">Đang rà soát bản vẽ</option>
                  <option value="quoted">Đã gửi báo giá</option>
                  <option value="contracted">Chốt hợp đồng</option>
                  <option value="rejected">Không khả thi</option>
                </select>
              </div>

              <a
                href={`tel:${selectedRfq.phone}`}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] text-xs font-mono font-medium transition-colors"
              >
                Gọi Khách: {selectedRfq.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
