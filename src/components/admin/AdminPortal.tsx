import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Language, ProductItem } from '../../types';
import {
  adminLogin,
  adminGetStats,
  adminGetRfqs,
  adminUpdateRfqStatus,
  adminGetProducts,
  adminCreateProduct,
  adminDeleteProduct,
  adminToggleProductStatus,
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

type AdminTab = 'overview' | 'rfqs' | 'products' | 'contacts' | 'media';

export default function AdminPortal({ isOpen, lang, onClose }: AdminPortalProps) {
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

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productSearch, setProductSearch] = useState<string>('');
  const [productCatFilter, setProductCatFilter] = useState<string>('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

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
      const [statsData, rfqsData, prodsData, contactsData] = await Promise.all([
        adminGetStats(),
        adminGetRfqs(),
        adminGetProducts(),
        adminGetContacts(),
      ]);
      setStats(statsData);
      setRfqs(rfqsData);
      setProducts(prodsData);
      setContacts(contactsData);
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
          <aside className="w-full md:w-60 bg-[#141312] border-r border-white/10 flex flex-col justify-between shrink-0">
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
                  {activeTab === 'products' && 'Danh Mục 29 Sản Phẩm May Đo'}
                  {activeTab === 'contacts' && 'Hộp Thư Liên Hệ Khách Hàng'}
                </h1>
                <span className="text-xs text-white/50 font-light">
                  {activeTab === 'overview' && 'Theo dõi tiến độ báo giá, năng lực sản xuất và thông báo'}
                  {activeTab === 'rfqs' && 'Rà soát bản vẽ kỹ thuật CAD/DWG/BOQ và phân loại trạng thái'}
                  {activeTab === 'products' && 'Cập nhật thông số song ngữ, quy cách mm & hình ảnh'}
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
                    onClick={() => setIsAddProductOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#C5A880] text-[#191919] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
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
                    <span className="text-[11px] text-white/50 font-mono block">Warm Wood, Black, Stanley...</span>
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
                      className="text-xs font-mono text-[#C5A880] hover:underline"
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

            {/* TAB 3: PRODUCTS MANAGEMENT */}
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

                {/* Products Table */}
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
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.sku)}
                                className="p-1.5 rounded bg-red-900/30 hover:bg-red-800 text-red-300 transition-colors cursor-pointer"
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

            {/* TAB 4: CONTACTS */}
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

      {/* RFQ DETAIL INSPECTION MODAL */}
      {selectedRfq && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedRfq(null)}
        >
          <div
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
