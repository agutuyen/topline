export type Language = 'vi' | 'en';

export type CollectionCategoryId =
  | 'warm-wood'
  | 'black-contemporary'
  | 'sculptural'
  | 'dining-accent'
  | 'marlow-oak'
  | 'burl-oak';

export interface ProductItem {
  id: string;
  sku: string;
  name: { vi: string; en: string };
  category: CollectionCategoryId | string;
  categoryLabel: { vi: string; en: string };
  collectionId: CollectionCategoryId | string;
  collectionName: { vi: string; en: string };
  dimensions: string;
  dimensionsCm?: string;
  materials: { vi: string; en: string };
  finish: { vi: string; en: string };
  color?: { vi: string; en: string };
  hardware?: { vi: string; en: string };
  designStyle?: { vi: string; en: string };
  features?: { vi: string; en: string };
  image: string;
  cutoutImage?: string;
  collectionImage?: string;
  detailImage?: string;
  description: { vi: string; en: string };
  tags: string[];
  seoKeywords?: string;
}

export interface CollectionGroup {
  id: string;
  number: string;
  title: { vi: string; en: string };
  subtitle: { vi: string; en: string };
  pieces: string;
  overviewImage: string;
  detailImage?: string;
  materialsSummary?: { vi: string; en: string };
}

export interface ProjectGalleryImage {
  url: string;
  caption: { vi: string; en: string };
}

export interface ProjectItem {
  id: string;
  client: string;
  badge: { vi: string; en: string };
  title: { vi: string; en: string };
  desc: { vi: string; en: string };
  image: string;
  galleryImages: ProjectGalleryImage[];
  scope: { vi: string; en: string };
  materials: { vi: string; en: string };
  standards: { vi: string; en: string };
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
