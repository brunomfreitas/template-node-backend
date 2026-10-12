// CÓDIGO V8
// src/http/controllers/pac/search.ts
import { pacUseCases } from "@/use-cases/pac/factory";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("pac", async (args) => {
	const usecase = pacUseCases.search();
  	return usecase.handler(args);
});