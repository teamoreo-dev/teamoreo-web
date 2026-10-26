/**
 * The backend treats `category` as free text, so the admin form uses one fixed list to stop
 * the public category filter from fragmenting ("News" vs "news ").
 * ⚠ PLACEHOLDER: agree the real list with the lead and Timileyin, then edit it here only.
 */
export const BLOG_CATEGORIES = ["News", "Insights", "Case Studies", "Company"] as const;
