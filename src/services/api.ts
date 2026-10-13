import { ProductItem, CollectionGroup } from '../types';
import { PRODUCTS_CATALOG, COLLECTIONS_OVERVIEW } from '../data/content';

const API_BASE = '/api/v1';

export function getAuthToken(): string | null {
  return localStorage.getItem('topline_admin_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('topline_admin_token', token);
}

export function removeAuthToken(): void {
  localStorage.removeItem('topline_admin_token');
}

function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ==========================================
// PUBLIC CLIENT API (WITH ROBUST STATIC FALLBACK)
// ==========================================

export async function fetchProducts(filters?: { category?: string; search?: string }): Promise<ProductItem[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (!res.ok) throw new Error('API request failed');

    const json = (await res.json()) as { success: boolean; data: ProductItem[] };
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return PRODUCTS_CATALOG;
  } catch {
    // Graceful offline/static fallback to 29 products
    return PRODUCTS_CATALOG;
  }
}

export async function fetchCollections(): Promise<CollectionGroup[]> {
  try {
    const res = await fetch(`${API_BASE}/collections`);
    if (!res.ok) throw new Error('API request failed');

    const json = (await res.json()) as { success: boolean; data: CollectionGroup[] };
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return COLLECTIONS_OVERVIEW;
  } catch {
    return COLLECTIONS_OVERVIEW;
  }
}

export interface SubmitRfqPayload {
  fullName: string;
  phone: string;
  email: string;
  companyName?: string;
  projectType: string;
  notes?: string;
  selectedProducts: { id: string; sku: string; name?: string }[];
  files?: File[];
}

export interface RfqResponseData {
  id: string;
  trackingCode: string;
  message: string;
  attachedCount: number;
}

export async function submitRfq(payload: SubmitRfqPayload): Promise<RfqResponseData> {
  const formData = new FormData();
  formData.append('fullName', payload.fullName);
  formData.append('phone', payload.phone);
  formData.append('email', payload.email);
  if (payload.companyName) formData.append('companyName', payload.companyName);
  formData.append('projectType', payload.projectType);
  if (payload.notes) formData.append('notes', payload.notes);
  formData.append('selectedProducts', JSON.stringify(payload.selectedProducts));

  if (payload.files && payload.files.length > 0) {
    for (const file of payload.files) {
      formData.append('files', file);
    }
  }

  const res = await fetch(`${API_BASE}/rfq`, {
    method: 'POST',
    body: formData,
  });

  const json = (await res.json()) as { success: boolean; data: RfqResponseData; error?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gửi yêu cầu báo giá không thành công');
  }

  return json.data;
}

export async function submitContact(data: {
  fullName: string;
  phone?: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = (await res.json()) as { success: boolean; message?: string; error?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Gửi tin nhắn liên hệ không thành công');
  }

  return { message: json.message || 'Thành công' };
}

// ==========================================
// ADMIN DASHBOARD API (BEARER TOKEN PROTECTED)
// ==========================================

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
}

export async function adminLogin(
  username: string,
  password: string
): Promise<{ token: string; admin: AdminUser }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const json = (await res.json()) as {
    success: boolean;
    data?: { token: string; admin: AdminUser };
    error?: string;
  };

  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Đăng nhập không thành công');
  }

  setAuthToken(json.data.token);
  return json.data;
}

export async function adminGetMe(): Promise<AdminUser> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { ...authHeaders() },
  });

  const json = (await res.json()) as { success: boolean; data?: AdminUser; error?: string };
  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Phiên đăng nhập đã hết hạn');
  }

  return json.data;
}

export interface DashboardStats {
  rfqs: {
    total: number;
    pending: number;
    reviewing: number;
    quoted: number;
    contracted: number;
    rejected: number;
  };
  products: {
    total: number;
    published: number;
  };
  contacts: {
    total: number;
    unread: number;
  };
  recentRfqs: {
    id: string;
    trackingCode: string;
    fullName: string;
    companyName: string;
    projectType: string;
    status: string;
    createdAt: string;
  }[];
}

export async function adminGetStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/dashboard/stats`, {
    headers: { ...authHeaders() },
  });

  const json = (await res.json()) as { success: boolean; data?: DashboardStats; error?: string };
  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Không thể tải thống kê');
  }

  return json.data;
}

export async function adminGetProducts(filters?: { category?: string; search?: string }): Promise<ProductItem[]> {
  return fetchProducts(filters);
}

export async function adminCreateProduct(productData: Record<string, unknown>): Promise<ProductItem> {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(productData),
  });
  const json = (await res.json()) as { success: boolean; data?: ProductItem; error?: string };
  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Không thể tạo sản phẩm');
  }
  return json.data;
}
export interface RfqRecord {
  id: string;
  trackingCode: string;
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  projectType: string;
  notes: string;
  selectedProducts: { id: string; sku: string; name?: string }[];
  status: string;
  internalNotes: string;
  attachments: {
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export async function adminGetRfqs(filters?: { status?: string; search?: string }): Promise<RfqRecord[]> {
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);

  const res = await fetch(`${API_BASE}/rfqs?${params.toString()}`, {
    headers: { ...authHeaders() },
  });

  const json = (await res.json()) as { success: boolean; data?: RfqRecord[]; error?: string };
  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Không thể tải danh sách RFQ');
  }

  return json.data;
}

export async function adminUpdateRfqStatus(
  id: string,
  status: string,
  internalNotes?: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/rfqs/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ status, internal_notes: internalNotes }),
  });

  const json = (await res.json()) as { success: boolean; error?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Không thể cập nhật trạng thái');
  }
}

export async function adminToggleProductStatus(id: string, isPublished: boolean): Promise<void> {
  const res = await fetch(`${API_BASE}/products/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ is_published: isPublished }),
  });

  const json = (await res.json()) as { success: boolean; error?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Không thể cập nhật trạng thái sản phẩm');
  }
}

export async function adminDeleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });

  const json = (await res.json()) as { success: boolean; error?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Không thể xóa sản phẩm');
  }
}

export interface ContactRecord {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export async function adminGetContacts(): Promise<ContactRecord[]> {
  const res = await fetch(`${API_BASE}/contacts`, {
    headers: { ...authHeaders() },
  });

  const json = (await res.json()) as { success: boolean; data?: ContactRecord[]; error?: string };
  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.error || 'Không thể tải hộp thư');
  }

  return json.data;
}

export async function adminUpdateContactStatus(id: number, status: string): Promise<void> {
  const res = await fetch(`${API_BASE}/contacts/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ status }),
  });

  const json = (await res.json()) as { success: boolean; error?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Không thể cập nhật trạng thái tin nhắn');
  }
}
