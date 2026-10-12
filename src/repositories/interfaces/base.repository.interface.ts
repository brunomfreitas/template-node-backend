import { OrderDir } from "./prisma-base.repository.interface";

export type ListInput = {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: OrderDir;
  filter?: Record<string, any>;
};

export type SearchInput = {
  expr?: string;
  filter?: string;
  onlyActive?: boolean;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: OrderDir;
};

export type ListResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<null>;
  softDelete(id: number): Promise<T>;
  findById(id: number): Promise<T | null>;
  list(params: ListInput): Promise<ListResult<T>>;
  search(params: SearchInput): Promise<ListResult<T>>;
}