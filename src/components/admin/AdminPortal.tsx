import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowUpDown,
  Building2,
  ChevronLeft,
  ChevronRight,
  Edit3,
  FileText,
  KeyRound,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Plus,
  RefreshCw,
  Save,
  Search,
  Star,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { Language, ProductItem, CollectionGroup, ProjectItem } from '../../types';
import {
  adminLogin,
  adminChangePassword,
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
  adminGetMillworkProjects,
  adminUpdateMillworkProject,
  adminGetContacts,
  adminUpdateContactStatus,
  uploadImageFile,
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

type AdminTab = 'overview' | 'rfqs' | 'products' | 'collections' | 'millwork' | 'contacts';

export interface GalleryImageItem {
  url: string;
  caption?: string | { vi: string; en: string };
  isCover?: boolean;
}

// ── REUSABLE MULTI-IMAGE GALLERY MANAGER (1st image is primary cover photo) ──
interface MultiImageGalleryManagerProps {
  label: string;
  subLabel?: string;
  images: GalleryImageItem[];
  onChange: (images: GalleryImageItem[]) => void;
  maxImages?: number;
}

function MultiImageGalleryManager({
  label,
  subLabel,
  images,
  onChange,
  maxImages = 15,
}: MultiImageGalleryManagerProps) {
  const [uploading, setUploading] = useState(false);

  const handleFilesAdded = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 1. Instant local preview entries
    const localEntries: GalleryImageItem[] = files.map((f, i) => ({
      url: URL.createObjectURL(f),
      caption: f.name.replace(/\.[^/.]+$/, ''),
      isCover: images.length === 0 && i === 0,
    }));

    const combined = [...images, ...localEntries].slice(0, maxImages);
    onChange(combined);

    // 2. Upload to server in background
    setUploading(true);
    try {
      const uploadPromises = files.map(async (file, idx) => {
        try {
          const res = await uploadImageFile(file);
          return { originalIdx: images.length + idx, url: res.url };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(uploadPromises);
      const updated = [...combined];
      for (const r of results) {
        if (r && r.originalIdx < updated.length) {
          updated[r.originalIdx] = { ...updated[r.originalIdx], url: r.url };
        }
      }
      onChange(updated);
    } catch {
      // Keep local preview URLs
    } finally {
      setUploading(false);
    }
  };

  const setAsCover = (index: number) => {
    if (index === 0 || index >= images.length) return;
    const target = images[index];
    const rest = images.filter((_, i) => i !== index);
    const reordered = [{ ...target, isCover: true }, ...rest.map((img) => ({ ...img, isCover: false }))];
    onChange(reordered);
  };

  const removeImage = (index: number) => {
    const remaining = images.filter((_, i) => i !== index);
    if (remaining.length > 0) {
      remaining[0].isCover = true;
    }
    onChange(remaining);
  };

  return (
    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-white/90 text-xs font-medium block">{label}</span>
          {subLabel && <span className="text-[10px] text-white/40 font-mono">{subLabel}</span>}
        </div>
        <span className="text-[10px] font-mono text-[#C5A880]">
          {images.length} / {maxImages} ảnh (Ảnh #1 là ảnh đại diện chính)
        </span>
      </div>

      {/* Visual Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((img, idx) => {
          const captionStr =
            typeof img.caption === 'string'
              ? img.caption
              : img.caption?.vi || img.caption?.en || `Ảnh ${idx + 1}`;

          return (
            <div
              key={`${img.url}-${idx}`}
              className={`relative aspect-square rounded-xl overflow-hidden bg-white/5 border-2 group p-1 flex items-center justify-center ${
                idx === 0
                  ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-md'
                  : 'border-white/15 hover:border-white/30'
              }`}
            >
              <img src={img.url} alt={captionStr} className="w-full h-full object-contain" />

              {/* Cover Badge on first image */}
              {idx === 0 ? (
                <div className="absolute top-1.5 left-1.5 z-10 px-2 py-0.5 rounded-sm bg-[#C5A880] text-[#191919] font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span>Ảnh Đại Diện</span>
                </div>
              ) : (
                <div className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-sm bg-black/70 text-white font-mono text-[9px]">
                  #{idx + 1}
                </div>
              )}

              {/* Hover Actions Bar */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => setAsCover(idx)}
                    className="w-full py-1 px-1.5 rounded bg-[#C5A880] hover:bg-white text-[#191919] text-[10px] font-mono font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    title="Chọn ảnh này làm ảnh đại diện chính trên website"
                  >
                    <Star className="w-3 h-3" />
                    <span>Chọn Làm Ảnh Bìa</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="w-full py-1 px-1.5 rounded bg-red-900/60 hover:bg-red-800 text-red-200 text-[10px] font-mono transition-colors cursor-pointer flex items-center justify-center gap-1"
                  title="Gỡ ảnh này khỏi danh sách"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Gỡ ảnh</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Add Images from Computer Button */}
        {images.length < maxImages && (
          <label className="aspect-square flex flex-col items-center justify-center p-3 border-2 border-dashed border-white/20 hover:border-[#C5A880] rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all text-center">
            <Upload className="w-5 h-5 text-[#C5A880] mb-1" />
            <span className="text-[11px] font-mono text-white/80">
              {uploading ? 'Đang xử lý...' : '+ Thêm Hình Ảnh'}
            </span>
            <span className="text-[9px] text-white/40 font-mono mt-0.5">Tải từ thiết bị</span>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFilesAdded}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('TopLine@2026!');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // RFQ State & Pagination
  const [rfqs, setRfqs] = useState<RfqRecord[]>([]);
  const [selectedRfq, setSelectedRfq] = useState<RfqRecord | null>(null);
  const [rfqFilterStatus, setRfqFilterStatus] = useState<string>('all');
  const [rfqSearch, setRfqSearch] = useState<string>('');
  const [rfqPage, setRfqPage] = useState<number>(1);
  const [rfqPageSize, setRfqPageSize] = useState<number>(10);
  const [rfqSortField, setRfqSortField] = useState<'createdAt' | 'trackingCode' | 'fullName' | 'status'>('createdAt');
  const [rfqSortOrder, setRfqSortOrder] = useState<'asc' | 'desc'>('desc');

  // Products State & Pagination
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productSearch, setProductSearch] = useState<string>('');
  const [productCatFilter, setProductCatFilter] = useState<string>('all');
  const [productPage, setProductPage] = useState<number>(1);
  const [productPageSize, setProductPageSize] = useState<number>(10);
  const [productSortField, setProductSortField] = useState<'sku' | 'name' | 'category' | 'dimensions' | 'isPublished'>('sku');
  const [productSortOrder, setProductSortOrder] = useState<'asc' | 'desc'>('asc');

  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Collections State
  const [collections, setCollections] = useState<CollectionGroup[]>([]);
  const [editingCollection, setEditingCollection] = useState<CollectionGroup | null>(null);

  // Millwork Projects State
  const [millworkProjects, setMillworkProjects] = useState<ProjectItem[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Form Edit State for Products (Multi-Image Gallery)
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
    galleryImages: [] as GalleryImageItem[],
    isPublished: true,
  });

  // Form Edit State for Collections (Multi-Image Gallery)
  const [collectionForm, setCollectionForm] = useState({
    number: '',
    titleVi: '',
    titleEn: '',
    subtitleVi: '',
    subtitleEn: '',
    pieces: '',
    materialsSummaryVi: '',
    materialsSummaryEn: '',
    galleryImages: [] as GalleryImageItem[],
  });

  // Form Edit State for Millwork Projects (Multi-Image Gallery)
  const [projectForm, setProjectForm] = useState({
    client: '',
    badgeVi: '',
    badgeEn: '',
    titleVi: '',
    titleEn: '',
    descVi: '',
    descEn: '',
    scopeVi: '',
    scopeEn: '',
    materialsVi: '',
    materialsEn: '',
    standardsVi: '',
    standardsEn: '',
    galleryImages: [] as { url: string; caption: { vi: string; en: string } }[],
  });

  const [formLangTab, setFormLangTab] = useState<'vi' | 'en'>('vi');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Contacts State & Pagination
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [contactPage, setContactPage] = useState<number>(1);
  const [contactPageSize, setContactPageSize] = useState<number>(10);
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
      const [statsData, rfqsData, prodsData, contactsData, colsData, millworkData] = await Promise.all([
        adminGetStats(),
        adminGetRfqs(),
        adminGetProducts(),
        adminGetContacts(),
        adminGetCollections(),
        adminGetMillworkProjects(),
      ]);
      setStats(statsData);
      setRfqs(rfqsData);
      setProducts(prodsData);
      setContacts(contactsData);
      setCollections(colsData);
      setMillworkProjects(millworkData);
    } catch {
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

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordChangeError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordChangeError('Mật khẩu mới phải có ít nhất 8 ký tự');
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await adminChangePassword(currentPassword, newPassword);
      setPasswordChangeMessage(res.message || 'Đổi mật khẩu thành công!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordChangeMessage('');
      }, 1200);
    } catch (err) {
      setPasswordChangeError(err instanceof Error ? err.message : 'Đổi mật khẩu thất bại');
    } finally {
      setIsChangingPassword(false);
    }
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

    // Build initial gallery images list (1st is cover)
    const gallery: GalleryImageItem[] = [
      { url: p.image, caption: p.name.vi, isCover: true },
      ...(p.cutoutImage ? [{ url: p.cutoutImage, caption: 'Bản vẽ tách nền PNG', isCover: false }] : []),
      ...(p.collectionImage ? [{ url: p.collectionImage, caption: 'Phối cảnh không gian nội thất', isCover: false }] : []),
      ...(p.detailImage ? [{ url: p.detailImage, caption: 'Chi tiết vân mộc & đá', isCover: false }] : []),
    ];

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
      galleryImages: gallery,
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
      galleryImages: [
        { url: '/images/products/TL-WW-01_Credenza_Cabinet.png', caption: 'Ảnh đại diện chính', isCover: true },
      ],
      isPublished: true,
    });
    setFormLangTab('vi');
    setSaveSuccessMessage('');
  };

  // Save Product (Create or Update with Multi-Image Support)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccessMessage('');

    // First image in gallery is the primary cover photo
    const primaryImg =
      productForm.galleryImages.length > 0
        ? productForm.galleryImages[0].url
        : '/images/products/TL-WW-01_Credenza_Cabinet.png';

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
      image: primaryImg,
      galleryImages: productForm.galleryImages,
      isPublished: productForm.isPublished,
      is_published: productForm.isPublished ? 1 : 0,
    };

    try {
      if (editingProduct) {
        const updated = await adminUpdateProduct(editingProduct.id, payload);
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setSaveSuccessMessage('Đã cập nhật sản phẩm và bộ sưu tập ảnh thành công!');
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
    const gallery: GalleryImageItem[] = [
      { url: c.overviewImage, caption: 'Ảnh tổng thể Moodboard', isCover: true },
      ...(c.detailImage ? [{ url: c.detailImage, caption: 'Mẫu vật liệu đặc trưng', isCover: false }] : []),
    ];

    setCollectionForm({
      number: c.number,
      titleVi: c.title.vi,
      titleEn: c.title.en,
      subtitleVi: c.subtitle.vi,
      subtitleEn: c.subtitle.en,
      pieces: c.pieces,
      materialsSummaryVi: c.materialsSummary?.vi || '',
      materialsSummaryEn: c.materialsSummary?.en || '',
      galleryImages: gallery,
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

    const primaryImg =
      collectionForm.galleryImages.length > 0
        ? collectionForm.galleryImages[0].url
        : editingCollection.overviewImage;

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
      overviewImage: primaryImg,
      overview_image: primaryImg,
      galleryImages: collectionForm.galleryImages,
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

  // Open Edit Millwork Project Modal
  const openEditProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjectForm({
      client: proj.client,
      badgeVi: proj.badge.vi,
      badgeEn: proj.badge.en,
      titleVi: proj.title.vi,
      titleEn: proj.title.en,
      descVi: proj.desc.vi,
      descEn: proj.desc.en,
      scopeVi: proj.scope.vi,
      scopeEn: proj.scope.en,
      materialsVi: proj.materials.vi,
      materialsEn: proj.materials.en,
      standardsVi: proj.standards.vi,
      standardsEn: proj.standards.en,
      galleryImages: [...proj.galleryImages],
    });
    setFormLangTab('vi');
    setSaveSuccessMessage('');
  };

  // Save Millwork Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSaving(true);
    setSaveSuccessMessage('');

    const primaryImg =
      projectForm.galleryImages.length > 0
        ? projectForm.galleryImages[0].url
        : editingProject.image;

    const payload = {
      client: projectForm.client,
      badge: { vi: projectForm.badgeVi, en: projectForm.badgeEn },
      badge_vi: projectForm.badgeVi,
      badge_en: projectForm.badgeEn,
      title: { vi: projectForm.titleVi, en: projectForm.titleEn },
      title_vi: projectForm.titleVi,
      title_en: projectForm.titleEn,
      desc: { vi: projectForm.descVi, en: projectForm.descEn },
      desc_vi: projectForm.descVi,
      desc_en: projectForm.descEn,
      scope: { vi: projectForm.scopeVi, en: projectForm.scopeEn },
      scope_vi: projectForm.scopeVi,
      scope_en: projectForm.scopeEn,
      materials: { vi: projectForm.materialsVi, en: projectForm.materialsEn },
      materials_vi: projectForm.materialsVi,
      materials_en: projectForm.materialsEn,
      standards: { vi: projectForm.standardsVi, en: projectForm.standardsEn },
      standards_vi: projectForm.standardsVi,
      standards_en: projectForm.standardsEn,
      image: primaryImg,
      galleryImages: projectForm.galleryImages,
    };

    try {
      const updated = await adminUpdateMillworkProject(editingProject.id, payload);
      setMillworkProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setSaveSuccessMessage('Đã cập nhật dự án mộc kiến trúc và thư viện ảnh thành công!');
      setTimeout(() => {
        setEditingProject(null);
      }, 800);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi khi lưu dự án');
    } finally {
      setIsSaving(false);
    }
  };

  // ── SORTING & PAGINATION CALCULATIONS ──

  // Sorted and Paginated Products
  const sortedProducts = useMemo(() => {
    const list = products
      .filter((p) => productCatFilter === 'all' || p.category === productCatFilter)
      .filter(
        (p) =>
          !productSearch ||
          p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
          p.name.vi.toLowerCase().includes(productSearch.toLowerCase()) ||
          p.name.en.toLowerCase().includes(productSearch.toLowerCase())
      );

    return list.sort((a, b) => {
      let valA = '';
      let valB = '';
      if (productSortField === 'sku') {
        valA = a.sku;
        valB = b.sku;
      } else if (productSortField === 'name') {
        valA = a.name.vi;
        valB = b.name.vi;
      } else if (productSortField === 'category') {
        valA = String(a.category);
        valB = String(b.category);
      } else if (productSortField === 'dimensions') {
        valA = a.dimensions;
        valB = b.dimensions;
      } else if (productSortField === 'isPublished') {
        const numA = a.isPublished !== false ? 1 : 0;
        const numB = b.isPublished !== false ? 1 : 0;
        return productSortOrder === 'asc' ? numA - numB : numB - numA;
      }

      return productSortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [products, productCatFilter, productSearch, productSortField, productSortOrder]);

  const totalProductPages = Math.max(1, Math.ceil(sortedProducts.length / productPageSize));
  const paginatedProducts = useMemo(() => {
    const start = (productPage - 1) * productPageSize;
    return sortedProducts.slice(start, start + productPageSize);
  }, [sortedProducts, productPage, productPageSize]);

  // Sorted and Paginated RFQs
  const sortedRfqs = useMemo(() => {
    const list = rfqs
      .filter((r) => rfqFilterStatus === 'all' || r.status === rfqFilterStatus)
      .filter(
        (r) =>
          !rfqSearch ||
          r.trackingCode.toLowerCase().includes(rfqSearch.toLowerCase()) ||
          r.fullName.toLowerCase().includes(rfqSearch.toLowerCase()) ||
          r.phone.includes(rfqSearch)
      );

    return list.sort((a, b) => {
      let valA = '';
      let valB = '';
      if (rfqSortField === 'createdAt') {
        valA = a.createdAt;
        valB = b.createdAt;
      } else if (rfqSortField === 'trackingCode') {
        valA = a.trackingCode;
        valB = b.trackingCode;
      } else if (rfqSortField === 'fullName') {
        valA = a.fullName;
        valB = b.fullName;
      } else if (rfqSortField === 'status') {
        valA = a.status;
        valB = b.status;
      }
      return rfqSortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [rfqs, rfqFilterStatus, rfqSearch, rfqSortField, rfqSortOrder]);

  const totalRfqPages = Math.max(1, Math.ceil(sortedRfqs.length / rfqPageSize));
  const paginatedRfqs = useMemo(() => {
    const start = (rfqPage - 1) * rfqPageSize;
    return sortedRfqs.slice(start, start + rfqPageSize);
  }, [sortedRfqs, rfqPage, rfqPageSize]);

  // Paginated Contacts
  const totalContactPages = Math.max(1, Math.ceil(contacts.length / contactPageSize));
  const paginatedContacts = useMemo(() => {
    const start = (contactPage - 1) * contactPageSize;
    return contacts.slice(start, start + contactPageSize);
  }, [contacts, contactPage, contactPageSize]);

  const toggleProductSort = (field: typeof productSortField) => {
    if (productSortField === field) {
      setProductSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setProductSortField(field);
      setProductSortOrder('asc');
    }
  };

  const toggleRfqSort = (field: typeof rfqSortField) => {
    if (rfqSortField === field) {
      setRfqSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setRfqSortField(field);
      setRfqSortOrder('asc');
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
                Hệ Thống Quản Trị
              </span>
            </div>
            <span className="text-[10px] text-white/50 font-sans block">
              Hệ Thống Quản Trị Trung Tâm · TopLine Furniture
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <>
              {/* CHANGE PASSWORD BUTTON */}
              <button
                onClick={() => {
                  setIsPasswordModalOpen(true);
                  setPasswordChangeError('');
                  setPasswordChangeMessage('');
                }}
                className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-xs font-mono text-[#C5A880] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Thay đổi mật khẩu quản trị viên"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Đổi Mật Khẩu</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-xs font-mono text-white/80 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </>
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
                QUẢN TRỊ TOPLINE
              </span>
              <h2 className="font-serif text-3xl font-normal text-white">Đăng Nhập Hệ Thống</h2>
              <p className="text-xs text-white/60 font-light">
                Cổng thông tin điều hành sản xuất, danh mục sản phẩm và hồ sơ báo giá dự án
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Tài khoản quản trị:</label>
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
                <span>Tài khoản nội bộ: </span>
                <span className="text-[#C5A880] font-bold">admin</span> /{' '}
                <span className="text-[#C5A880] font-bold">TopLine@2026!</span>
              </div>
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 rounded-xl bg-[#C5A880] hover:bg-white text-[#191919] text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {loggingIn ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard Layout */
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden bg-[#0F0E0D]">
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
                <span>Bảng Điều Hành Tổng Quan</span>
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
                  <span>Hồ Sơ Báo Giá (RFQ)</span>
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
                <span>Danh Mục Sản Phẩm</span>
              </button>

              <button
                onClick={() => setActiveTab('collections')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'collections'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Bộ Sưu Tập Thiết Kế</span>
              </button>

              {/* NEW: Millwork & Commercial Projects Tab */}
              <button
                onClick={() => setActiveTab('millwork')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                  activeTab === 'millwork'
                    ? 'bg-[#C5A880] text-[#191919] font-bold shadow-xs'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Dự Án Mộc Kiến Trúc</span>
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
                <span>Hộp Thư Khách Hàng</span>
              </button>
            </div>

            <div className="p-4 border-t border-white/10 text-[11px] font-mono text-white/40 space-y-1">
              <div>Công Ty TNHH Nội Thất Top Line</div>
              <div>Mã số thuế: 3703519683</div>
            </div>
          </aside>

          {/* Main Content Pane */}
          <main data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {activeTab === 'overview' && 'Bảng Điều Hành Tổng Quan'}
                  {activeTab === 'rfqs' && 'Quản Lý Hồ Sơ Báo Giá Dự Án (RFQ)'}
                  {activeTab === 'products' && 'Danh Mục Sản Phẩm & Hồ Sơ Kỹ Thuật'}
                  {activeTab === 'collections' && 'Bộ Sưu Tập Nội Thất Nghỉ Dưỡng'}
                  {activeTab === 'millwork' && 'Hồ Sơ Mộc Kiến Trúc & Công Trình Chuỗi'}
                  {activeTab === 'contacts' && 'Hộp Thư Tư Vấn & Liên Hệ Khách Hàng'}
                </h1>
                <span className="text-xs text-white/50 font-light">
                  {activeTab === 'overview' && 'Theo dõi tiến độ hồ sơ báo giá, tình trạng sản phẩm và yêu cầu từ khách hàng'}
                  {activeTab === 'rfqs' && 'Tiếp nhận bản vẽ kỹ thuật CAD/DWG, khối lượng BOQ và cập nhật tiến trình phản hồi'}
                  {activeTab === 'products' && 'Quản lý hình ảnh thực tế, thông số quy cách và trạng thái hiển thị từng sản phẩm'}
                  {activeTab === 'collections' && 'Thông điệp thiết kế, hình ảnh phối cảnh và vật liệu chủ đạo từng bộ sưu tập'}
                  {activeTab === 'millwork' && 'Thông số hoàn thiện, vật liệu chỉ định và thư viện hình ảnh chi tiết từng dự án'}
                  {activeTab === 'contacts' && 'Thông tin trao đổi, yêu cầu tư vấn vật liệu và đề xuất dự án từ khách hàng'}
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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Tổng Hồ Sơ Báo Giá</span>
                    <div className="font-serif text-3xl font-medium text-[#C5A880]">{stats.rfqs.total}</div>
                    <span className="text-[11px] text-amber-400 font-mono block">
                      {stats.rfqs.pending} hồ sơ đang xử lý
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Sản Phẩm Đang Hiển Thị</span>
                    <div className="font-serif text-3xl font-medium text-white">{stats.products.published}</div>
                    <span className="text-[11px] text-white/50 font-mono block">Đang hoạt động trên website</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Bộ Sưu Tập Thiết Kế</span>
                    <div className="font-serif text-3xl font-medium text-[#C5A880]">6</div>
                    <span className="text-[11px] text-white/50 font-mono block">Đồng bộ dữ liệu kỹ thuật</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#181615] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-white/50 uppercase">Thư Tư Vấn Chưa Đọc</span>
                    <div className="font-serif text-3xl font-medium text-emerald-400">{stats.contacts.unread || 0}</div>
                    <span className="text-[11px] text-white/50 font-mono block">Tổng cộng: {stats.contacts.total} thư tiếp nhận</span>
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
                          <th className="pb-3">Khách Hàng / Doanh Nghiệp</th>
                          <th className="pb-3">Loại Hình Dự Án</th>
                          <th className="pb-3">Tiến Trình</th>
                          <th className="pb-3">Ngày Tiếp Nhận</th>
                          <th className="pb-3 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {stats.recentRfqs.map((r) => (
                          <tr key={r.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 font-mono font-bold text-[#C5A880]">{r.trackingCode}</td>
                            <td className="py-3">
                              <span className="font-medium text-white block">{r.fullName}</span>
                              <span className="text-[11px] text-white/50">{r.companyName || 'Khách hàng cá nhân'}</span>
                            </td>
                            <td className="py-3 font-mono capitalize">{r.projectType}</td>
                            <td className="py-3">
                              <span
                                className={`px-2.5 py-0.5 rounded-sm text-[10px] font-mono uppercase font-semibold ${
                                  r.status === 'pending'
                                    ? 'bg-amber-900/40 text-amber-300 border border-amber-500/30'
                                    : r.status === 'reviewing'
                                    ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30'
                                    : r.status === 'quoted'
                                    ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                                    : 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {r.status === 'pending'
                                  ? 'Tiếp nhận mới'
                                  : r.status === 'reviewing'
                                  ? 'Đang rà soát'
                                  : r.status === 'quoted'
                                  ? 'Đã gửi báo giá'
                                  : 'Đã ký hợp đồng'}
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
                                Xem Hồ Sơ
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
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'pending', label: 'Tiếp nhận mới' },
                      { id: 'reviewing', label: 'Đang rà soát' },
                      { id: 'quoted', label: 'Đã gửi báo giá' },
                      { id: 'contracted', label: 'Đã ký hợp đồng' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setRfqFilterStatus(st.id);
                          setRfqPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer text-xs ${
                          rfqFilterStatus === st.id
                            ? 'bg-[#C5A880] text-[#191919] font-bold border-[#C5A880]'
                            : 'border-white/15 text-white/70 hover:bg-white/5'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tìm mã hồ sơ, tên khách hàng, số điện thoại..."
                      value={rfqSearch}
                      onChange={(e) => {
                        setRfqSearch(e.target.value);
                        setRfqPage(1);
                      }}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#181615] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-[#181615] border border-white/10 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40 text-white/50 font-mono uppercase text-[10px]">
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleRfqSort('trackingCode')}>
                          <div className="flex items-center gap-1">
                            <span>Mã RFQ</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleRfqSort('fullName')}>
                          <div className="flex items-center gap-1">
                            <span>Người Liên Hệ</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4">Điện Thoại / Email</th>
                        <th className="p-4">Sản Phẩm & Bản Vẽ</th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleRfqSort('status')}>
                          <div className="flex items-center gap-1">
                            <span>Trạng Thái</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleRfqSort('createdAt')}>
                          <div className="flex items-center gap-1">
                            <span>Thời Gian</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {paginatedRfqs.map((r) => (
                        <tr key={r.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#C5A880]">{r.trackingCode}</td>
                          <td className="p-4">
                            <span className="font-semibold text-white block">{r.fullName}</span>
                            <span className="text-[11px] text-white/50">{r.companyName || 'Khách hàng cá nhân'}</span>
                          </td>
                          <td className="p-4 font-mono">
                            <div className="text-white">{r.phone}</div>
                            <div className="text-white/50 text-[11px]">{r.email}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-xs text-white/80">{r.selectedProducts.length} sản phẩm chọn</div>
                            <div className="text-[11px] text-[#C5A880]">📎 {r.attachments.length} bản vẽ đính kèm</div>
                          </td>
                          <td className="p-4">
                            <select
                              value={r.status}
                              onChange={(e) => handleUpdateRfqStatus(r.id, e.target.value)}
                              className="px-2 py-1 rounded bg-black/40 border border-white/20 text-[11px] font-mono uppercase focus:outline-hidden"
                            >
                              <option value="pending">🟡 Tiếp nhận mới</option>
                              <option value="reviewing">🔵 Đang rà soát bản vẽ</option>
                              <option value="quoted">🟣 Đã gửi báo giá</option>
                              <option value="contracted">🟢 Đã ký hợp đồng</option>
                              <option value="rejected">🔴 Tạm dừng / Từ chối</option>
                            </select>
                          </td>
                          <td className="p-4 text-white/50 font-mono text-[11px]">{r.createdAt}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedRfq(r)}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] font-mono text-xs transition-colors cursor-pointer"
                            >
                              Xem Hồ Sơ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 bg-black/30">
                    <div>
                      Hiển thị {Math.min(sortedRfqs.length, (rfqPage - 1) * rfqPageSize + 1)} -{' '}
                      {Math.min(sortedRfqs.length, rfqPage * rfqPageSize)} trên tổng số {sortedRfqs.length} hồ sơ
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRfqPage((p) => Math.max(1, p - 1))}
                        disabled={rfqPage <= 1}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span>Trang {rfqPage} / {totalRfqPages}</span>
                      <button
                        onClick={() => setRfqPage((p) => Math.min(totalRfqPages, p + 1))}
                        disabled={rfqPage >= totalRfqPages}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS MANAGEMENT (MULTI-IMAGE GALLERY & VISUAL MANAGEMENT) */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'warm-wood', label: '01. Gỗ Ấm' },
                      { id: 'black-contemporary', label: '02. Đen Kiến Trúc' },
                      { id: 'sculptural', label: '03. Điêu Khắc' },
                      { id: 'dining-accent', label: '04. Bàn Ăn' },
                      { id: 'marlow-oak', label: '05. Marlow' },
                      { id: 'burl-oak', label: '06. Burl Oak' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setProductCatFilter(cat.id);
                          setProductPage(1);
                        }}
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
                      placeholder="Tìm theo mã SKU, tên sản phẩm, vật liệu..."
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setProductPage(1);
                      }}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#181615] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-[#181615] border border-white/10 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40 text-white/50 font-mono uppercase text-[10px]">
                        <th className="p-4">Ảnh Đại Diện</th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleProductSort('sku')}>
                          <div className="flex items-center gap-1">
                            <span>SKU</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleProductSort('name')}>
                          <div className="flex items-center gap-1">
                            <span>Tên Sản Phẩm (VI / EN)</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleProductSort('dimensions')}>
                          <div className="flex items-center gap-1">
                            <span>Kích Thước</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleProductSort('category')}>
                          <div className="flex items-center gap-1">
                            <span>Bộ Sưu Tập</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 cursor-pointer hover:text-white" onClick={() => toggleProductSort('isPublished')}>
                          <div className="flex items-center gap-1">
                            <span>Hiển Thị</span>
                            <ArrowUpDown className="w-3 h-3 text-[#C5A880]" />
                          </div>
                        </th>
                        <th className="p-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {paginatedProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="w-12 h-12 rounded-lg bg-white p-1 overflow-hidden border border-white/10">
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
                              {p.isPublished !== false ? 'Đang hiển thị' : 'Đang ẩn'}
                            </button>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => openEditProduct(p)}
                              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] font-mono text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                              title="Chỉnh sửa thông số & thư viện ảnh"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Chỉnh Sửa</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(p.id, p.sku)}
                              className="p-1.5 rounded bg-red-900/30 hover:bg-red-800 text-red-300 transition-colors cursor-pointer inline-flex items-center"
                              title="Gỡ bỏ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 bg-black/30">
                    <div>
                      Hiển thị {Math.min(sortedProducts.length, (productPage - 1) * productPageSize + 1)} -{' '}
                      {Math.min(sortedProducts.length, productPage * productPageSize)} trên tổng số {sortedProducts.length} sản phẩm
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                        disabled={productPage <= 1}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span>Trang {productPage} / {totalProductPages}</span>
                      <button
                        onClick={() => setProductPage((p) => Math.min(totalProductPages, p + 1))}
                        disabled={productPage >= totalProductPages}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: COLLECTIONS MANAGEMENT */}
            {activeTab === 'collections' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collections.map((col) => (
                    <div
                      key={col.id}
                      className="p-6 rounded-3xl bg-[#181615] border border-white/10 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                          <span className="text-[#C5A880] font-bold">COLLECTION {col.number}</span>
                          <span className="text-white/40">ID: {col.id}</span>
                        </div>

                        <div className="mt-4 flex gap-4">
                          <div className="w-28 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 border border-white/10 p-1">
                            <img src={col.overviewImage} alt={col.title.vi} className="w-full h-full object-cover rounded-lg" />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg font-normal text-white">{col.title.vi}</h3>
                            <h4 className="font-serif text-xs italic text-white/50">{col.title.en}</h4>
                            <p className="mt-2 text-xs text-white/70 line-clamp-2 font-light">{col.subtitle.vi}</p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-white/70">
                          <span className="text-white/40 block text-[9px] uppercase">Hạng mục chính:</span>
                          <span className="text-[#C5A880]">{col.pieces}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => openEditCollection(col)}
                        className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Chỉnh Sửa Bộ Sưu Tập & Tải Ảnh</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: MILLWORK & COMMERCIAL PROJECTS (NEW: FULL MANAGEMENT & SUB-IMAGE GALLERY) */}
            {activeTab === 'millwork' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {millworkProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-6 rounded-3xl bg-[#181615] border border-white/10 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        {/* Project Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                          <span className="text-[#C5A880] font-bold">{proj.badge.vi}</span>
                          <span className="text-white/40">{proj.galleryImages.length} ảnh con</span>
                        </div>

                        {/* Project Cover Image */}
                        <div className="mt-4 aspect-16/10 rounded-xl overflow-hidden bg-black/40 border border-white/10 relative">
                          <img src={proj.image} alt={proj.title.vi} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-black/75 text-[10px] font-mono text-[#C5A880] border border-white/10">
                            {proj.client}
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <h3 className="font-serif text-lg font-normal text-white">{proj.title.vi}</h3>
                          <h4 className="font-serif text-xs italic text-white/50">{proj.title.en}</h4>
                          <p className="text-xs text-white/70 line-clamp-3 font-light leading-relaxed">
                            {proj.desc.vi}
                          </p>
                        </div>

                        {/* Specs overview */}
                        <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5 text-[11px] font-mono text-white/70">
                          <div>
                            <span className="text-white/40">Phạm vi: </span>
                            <span className="text-white/90 line-clamp-1">{proj.scope.vi}</span>
                          </div>
                          <div>
                            <span className="text-white/40">Vật liệu: </span>
                            <span className="text-white/90 line-clamp-1">{proj.materials.vi}</span>
                          </div>
                        </div>
                      </div>

                      {/* Edit Project Button */}
                      <button
                        onClick={() => openEditProject(proj)}
                        className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#C5A880] hover:text-[#191919] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Chỉnh Sửa Thông Tin & Đa Ảnh ({proj.galleryImages.length})</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: CONTACTS */}
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
                    {paginatedContacts.map((c) => (
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

                <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 bg-black/30">
                  <div>
                    Hiển thị {Math.min(contacts.length, (contactPage - 1) * contactPageSize + 1)} -{' '}
                    {Math.min(contacts.length, contactPage * contactPageSize)} trên tổng số {contacts.length} thư
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setContactPage((p) => Math.max(1, p - 1))}
                      disabled={contactPage <= 1}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span>Trang {contactPage} / {totalContactPages}</span>
                    <button
                      onClick={() => setContactPage((p) => Math.min(totalContactPages, p + 1))}
                      disabled={contactPage >= totalContactPages}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ── CHANGE PASSWORD MODAL ── */}
      {isPasswordModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setIsPasswordModalOpen(false)}
        >
          <div
            data-lenis-prevent
            className="w-full max-w-md bg-[#181615] rounded-3xl border border-white/20 p-6 sm:p-8 space-y-5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#C5A880]" />
                <h3 className="font-serif text-xl font-normal text-white">Đổi Mật Khẩu Quản Trị</h3>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordChangeError && (
              <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/40 text-red-200 text-xs text-center font-mono">
                {passwordChangeError}
              </div>
            )}

            {passwordChangeMessage && (
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono">
                ✓ {passwordChangeMessage}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-white/70 mb-1">Mật khẩu hiện tại *:</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Mật khẩu mới (tối thiểu 8 ký tự) *:</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới an toàn"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Xác nhận mật khẩu mới *:</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 text-xs transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-5 py-2.5 rounded-xl bg-[#C5A880] hover:bg-white text-[#191919] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isChangingPassword ? 'Đang cập nhật...' : 'Cập Nhật Mật Khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── PRODUCT EDIT / CREATE MODAL (WITH MULTI-IMAGE GALLERY MANAGER) ── */}
      {(editingProduct || isAddProductOpen) && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
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
                <div className="flex rounded-lg bg-black/50 p-1 border border-white/15 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setFormLangTab('vi')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      formLangTab === 'vi' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormLangTab('en')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
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

              {/* Row 2: Product Name */}
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

              {/* Row 4: Materials & Finish */}
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

              {/* ── MULTI-IMAGE GALLERY MANAGER (1st image is Cover photo, subsequent are other angles) ── */}
              <div className="pt-2 border-t border-white/10">
                <MultiImageGalleryManager
                  label="Bộ Sưu Tập Hình Ảnh Sản Phẩm (Nhiều Góc Chụp)"
                  subLabel="Tải ảnh từ máy tính. Kéo/chọn ảnh đầu tiên làm ảnh đại diện sản phẩm."
                  images={productForm.galleryImages}
                  onChange={(updatedImages) => setProductForm({ ...productForm, galleryImages: updatedImages })}
                  maxImages={12}
                />
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="prod-published"
                  checked={productForm.isPublished}
                  onChange={(e) => setProductForm({ ...productForm, isPublished: e.target.checked })}
                  className="rounded border-white/20 text-[#C5A880] focus:ring-[#C5A880] cursor-pointer"
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

      {/* ── COLLECTION EDIT MODAL WITH MULTI-IMAGE GALLERY ── */}
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
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      formLangTab === 'vi' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormLangTab('en')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
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

              {/* Multi-Image Gallery Manager for Collection */}
              <div className="pt-2 border-t border-white/10">
                <MultiImageGalleryManager
                  label="Bộ Sưu Tập Hình Ảnh (Moodboard, Bối Cảnh & Bề Mặt)"
                  subLabel="Ảnh đầu tiên làm ảnh đại diện chính của bộ sưu tập."
                  images={collectionForm.galleryImages}
                  onChange={(imgs) => setCollectionForm({ ...collectionForm, galleryImages: imgs })}
                  maxImages={8}
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

      {/* ── MILLWORK & PROJECT EDIT MODAL (WITH MULTI-IMAGE GALLERY MANAGER) ── */}
      {editingProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setEditingProject(null)}
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
                  QUẢN LÝ DỰ ÁN MỘC KIẾN TRÚC & F&B
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  {projectForm.titleVi || editingProject.client}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex rounded-lg bg-black/50 p-1 border border-white/15 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setFormLangTab('vi')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      formLangTab === 'vi' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormLangTab('en')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      formLangTab === 'en' ? 'bg-[#C5A880] text-[#191919] font-bold' : 'text-white/60'
                    }`}
                  >
                    English
                  </button>
                </div>

                <button
                  onClick={() => setEditingProject(null)}
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
              id="proj-edit-form"
              onSubmit={handleSaveProject}
              className="flex-1 overflow-y-auto overscroll-contain space-y-4 pr-1 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-white/70 mb-1">Tên khách hàng / Chuỗi thương hiệu *:</label>
                  <input
                    type="text"
                    required
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-white/70 mb-1">
                    {formLangTab === 'vi' ? 'Huy hiệu phân loại (VI):' : 'Classification Badge (EN):'}
                  </label>
                  <input
                    type="text"
                    value={formLangTab === 'vi' ? projectForm.badgeVi : projectForm.badgeEn}
                    onChange={(e) =>
                      formLangTab === 'vi'
                        ? setProjectForm({ ...projectForm, badgeVi: e.target.value })
                        : setProjectForm({ ...projectForm, badgeEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">
                  {formLangTab === 'vi' ? 'Tiêu đề dự án (Tiếng Việt) *:' : 'Project Title (English) *:'}
                </label>
                <input
                  type="text"
                  required
                  value={formLangTab === 'vi' ? projectForm.titleVi : projectForm.titleEn}
                  onChange={(e) =>
                    formLangTab === 'vi'
                      ? setProjectForm({ ...projectForm, titleVi: e.target.value })
                      : setProjectForm({ ...projectForm, titleEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block font-mono text-white/70 mb-1">
                  {formLangTab === 'vi' ? 'Mô tả tóm tắt (Tiếng Việt):' : 'Summary Description (English):'}
                </label>
                <textarea
                  rows={2}
                  value={formLangTab === 'vi' ? projectForm.descVi : projectForm.descEn}
                  onChange={(e) =>
                    formLangTab === 'vi'
                      ? setProjectForm({ ...projectForm, descVi: e.target.value })
                      : setProjectForm({ ...projectForm, descEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-white/70 mb-1">
                    {formLangTab === 'vi' ? 'Phạm vi công việc (VI):' : 'Scope of Work (EN):'}
                  </label>
                  <input
                    type="text"
                    value={formLangTab === 'vi' ? projectForm.scopeVi : projectForm.scopeEn}
                    onChange={(e) =>
                      formLangTab === 'vi'
                        ? setProjectForm({ ...projectForm, scopeVi: e.target.value })
                        : setProjectForm({ ...projectForm, scopeEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-white/70 mb-1">
                    {formLangTab === 'vi' ? 'Vật liệu chỉ định (VI):' : 'Materials Schedule (EN):'}
                  </label>
                  <input
                    type="text"
                    value={formLangTab === 'vi' ? projectForm.materialsVi : projectForm.materialsEn}
                    onChange={(e) =>
                      formLangTab === 'vi'
                        ? setProjectForm({ ...projectForm, materialsVi: e.target.value })
                        : setProjectForm({ ...projectForm, materialsEn: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Multi-Image Gallery Manager for Millwork Project Photos */}
              <div className="pt-2 border-t border-white/10">
                <MultiImageGalleryManager
                  label="Thư Viện Ảnh Chi Tiết Công Trình (Phóng To & SlideShow)"
                  subLabel="Ảnh đầu tiên là ảnh bìa công trình. Các ảnh sau là từng góc chụp chi tiết cho phép khách phóng to."
                  images={projectForm.galleryImages.map((g) => ({
                    url: g.url,
                    caption: g.caption?.vi || g.caption?.en || '',
                  }))}
                  onChange={(updated) =>
                    setProjectForm({
                      ...projectForm,
                      galleryImages: updated.map((u) => ({
                        url: u.url,
                        caption: {
                          vi: typeof u.caption === 'string' ? u.caption : u.caption?.vi || '',
                          en: typeof u.caption === 'string' ? u.caption : u.caption?.en || '',
                        },
                      })),
                    })
                  }
                  maxImages={20}
                />
              </div>
            </form>

            {/* Pinned Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 text-xs font-mono transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                form="proj-edit-form"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#C5A880] hover:bg-white text-[#191919] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi Dự Án'}</span>
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
