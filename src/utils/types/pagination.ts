// src/utils/types/pagination.ts
export type PageParams = {
  page?: number;   // default 1
  limit?: number;  // default 10, com clamp
};

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export type Paginated<T> = {
  items: T[];
  meta: PageMeta;
};


export function clampPageLimit(params: PageParams = {}) {
  const rawPage = Number(params.page ?? 1);
  const rawLimit = Number(params.limit ?? 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(Math.floor(rawLimit), 100) : 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}