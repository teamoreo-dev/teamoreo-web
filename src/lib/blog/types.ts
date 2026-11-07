export type PublicBlog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featuredImage?: { url: string; alt?: string };
  category?: string;
  author?: string;
  publishedAt?: string | null;
  seoTitle?: string;
  seoDescription?: string;
};

export type PublicBlogPage = {
  items: PublicBlog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
