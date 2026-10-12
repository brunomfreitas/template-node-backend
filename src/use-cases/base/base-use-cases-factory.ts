import { IBaseRepository } from "@/repositories/interfaces/base.repository.interface";
import {
	BaseCreateUseCase,
	BaseDeleteUseCase,
	BaseFindByIdUseCase,
	BaseListUseCase,
	BaseSearchUseCase,
	BaseSoftDeleteUseCase,
	BaseUpdateUseCase,
} from "./base-use-cases";

type Formatter<TInput, TOutput> = (data: TInput[]) => TOutput[];

export function createBaseUseCaseFactory<TEntity, TOutput = TEntity>(
  repository: IBaseRepository<TEntity>,
  options?: {
    formatListData?: Formatter<TEntity, TOutput>;
    formatSearchData?: Formatter<TEntity, TOutput>;
  }
) {
  return {
    create: () => new BaseCreateUseCase<TEntity>(repository),
    update: () => new BaseUpdateUseCase<TEntity>(repository),
    delete: () => new BaseDeleteUseCase<TEntity>(repository),
    softDelete: () => new BaseSoftDeleteUseCase<TEntity>(repository),
    findById: () => new BaseFindByIdUseCase<TEntity>(repository),
    list: () =>
      new BaseListUseCase<TEntity, TOutput>(
        repository,
        options?.formatListData
      ),
    search: () =>
      new BaseSearchUseCase<TEntity, TOutput>(
        repository,
        options?.formatSearchData
      ),
  };
}