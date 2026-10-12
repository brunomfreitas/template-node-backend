// CÓDIGO V6
// src/repositories/interfaces/site.repository.interface.ts

export type OrderDir = 'asc' | 'desc';

export type SearchParams<TWhere = Record<string, any>> = {
  /** termo livre aplicado nos campos do searchable-map */
  query?: string;
  /** filtros extras (viram AND no where) */
  where?: TWhere;
  /** só ativos? (aplica st_ativo: true se existir no modelo) */
  onlyActive?: boolean;
  /** ordenação (campo do modelo) */
  orderBy?: string;
  orderDir?: OrderDir;
  /** paginação */
  page?: number;       // 1-based
  pageSize?: number;   // 1..100 (clamp)
};

export type PaginatedResult<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export interface IPrismaBaseRepository<T, TWhere = Record<string, any>> {
  search(params?: SearchParams<TWhere>): Promise<PaginatedResult<T>>;

  list(params?: {
    filter?: TWhere;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderDir?: OrderDir;
  }): Promise<PaginatedResult<T>>;

  findById(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<null>; // delete delete
  softDelete(id: number): Promise<T>; // soft delete
}