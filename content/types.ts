export interface SpecRow {
  label: string;
  value: string;
}

export interface SpecGroup {
  heading: string;
  rows: SpecRow[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProductSummary {
  slug: string;
  name: string;
  keySpecs: string[];
  bestFor: string;
  detailRoute: string | null;
}

export interface Category {
  slug: string;
  route: string;
  name: string;
  metaDescription: string;
  intro: string;
  buyerTasks: string[];
  products: ProductSummary[];
}

export interface ProductDetail {
  slug: string;
  route: string;
  categorySlug: string;
  name: string;
  metaDescription: string;
  intro: string;
  specGroups: SpecGroup[];
  options: SpecGroup;
  faq: FaqItem[];
}
