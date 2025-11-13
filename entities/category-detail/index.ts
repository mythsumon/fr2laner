import { categoryDetails } from "./category-data";
import type { CategoryDetail } from "./category-types";

export const getCategoryDetailBySlug = (slug: string): CategoryDetail | undefined =>
  categoryDetails.find((detail) => detail.slug === slug);

export { categoryDetails };
export type { CategoryDetail } from "./category-types";
