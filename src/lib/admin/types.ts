export type ApiFailure = {
  success: false;
  error: { code: string; message: string; fields?: Record<string, string> };
};

/** List responses from the backend are flat: no nested "pagination" object. */
export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AdminUser = { id: string; name: string; email: string };

export type BlogStatus = "draft" | "published";

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: { url: string; publicId?: string; alt?: string };
  category: string;
  author: string;
  status: BlogStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactStatus = "new" | "read" | "resolved";

export type Contact = {
  _id: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string; // not included in list rows
  status: ContactStatus;
  createdAt: string;
  updatedAt?: string;
};

export type DashboardSummary = {
  totalArticles: number;
  publishedArticles: number;
  totalEnquiries: number;
  newEnquiries: number;
  recentEnquiries: Pick<
    Contact,
    "_id" | "name" | "email" | "subject" | "status" | "createdAt"
  >[];
};
