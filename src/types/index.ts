export type Language = 'vi' | 'en';

export interface ProductItem {
  id: string;
  name: { vi: string; en: string };
  category: 'warm-wood' | 'black-contemporary' | 'sculptural' | 'stanley' | 'dining';
  categoryLabel: { vi: string; en: string };
  dimensions: string;
  materials: { vi: string; en: string };
  finish: { vi: string; en: string };
  hardware?: { vi: string; en: string };
  image: string;
  description: { vi: string; en: string };
  tags: string[];
  collectionImage?: string;
  detailImage?: string;
}

export interface CollectionGroup {
  id: string;
  title: { vi: string; en: string };
  subtitle: { vi: string; en: string };
  description: { vi: string; en: string };
  materialsSummary: { vi: string; en: string };
  products: ProductItem[];
}

export interface WorkflowStep {
  step: string;
  title: { vi: string; en: string };
  desc: { vi: string; en: string };
  details: { vi: string; en: string };
}

export interface RFQFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  projectType: string;
  selectedProducts: string[];
  notes: string;
}
