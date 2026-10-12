// CÓDIGO V8
// src/http/controllers/figura-fundo/search.ts
import { figuraFundoUseCases } from "@/use-cases/figura-fundo/factory";
import { makeSearchHandler } from "../factory/make-search-handler";

export const search = makeSearchHandler("figura-fundo", async (args) => {
	const usecase = figuraFundoUseCases.search();
  	return usecase.handler(args);
});