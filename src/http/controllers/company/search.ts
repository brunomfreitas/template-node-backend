// src/http/controllers/company/search.ts
import { CompanyRepository } from "@/repositories/prisma/company.repository";
import { SearchUseCase } from "@/use-cases/company/search";
import { makeUseCase } from "@/use-cases/factory/make-use-case";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("company", async (args) => {
  const usecase = makeUseCase(SearchUseCase, CompanyRepository);
  return usecase.handler(args);
});
