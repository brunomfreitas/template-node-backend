// src/use-cases/factory/make-use-case.ts
export function makeUseCase<U, R>(
  UseCaseCtor: new (repo: R) => U,	// essa linha tipifica a varivel U | “UseCaseCtor é um construtor que recebe repo: R e retorna U.”
  RepoCtor: new () => R				// essa linha tipifica a variavel R | “RepoCtor é um construtor sem argumentos que retorna R.”
): U {
  const repo = new RepoCtor();
  return new UseCaseCtor(repo);
}