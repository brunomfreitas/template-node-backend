// src/utils/format-status-ativo.ts
// V0
// export function formatarStatusAtivo<T extends Record<string, any>>(lista: T[]): T[] {
//   return lista.map((item) => {
//     if ('st_ativo' in item) {
//       return {
//         ...item,
//         st_ativo: item.st_ativo ? 'Ativo' : 'Inativo'
//       };
//     }
//     return item;
//   });
// }


// V1
// utils/formatar-status-ativo.ts
// Objeto genérico base
export type AnyRecord = Record<string, any>;

/**
 * Adiciona o campo ID mantendo o tipo original.
 * T = tipo do item (ex.: { id_organizacao: number; st_ativo: boolean; ... })
 * K = chave da PK em T (ex.: 'id_organizacao')
 */
export type WithId<T extends AnyRecord, K extends keyof T> = T & {
  ID: T[K];
};

/**
 * Se T tiver st_ativo: boolean, converte para st_ativo: 'Ativo' | 'Inativo' no tipo.
 */
export type WithStatusLabel<T extends AnyRecord> =
  T extends { st_ativo: infer S }
    ? S extends boolean
      ? Omit<T, 'st_ativo'> & { st_ativo: 'Ativo' | 'Inativo' }
      : T
    : T;

/**
 * Tipo final:
 * - mantém os campos de T
 * - converte st_ativo boolean -> 'Ativo' | 'Inativo' (se existir)
 * - adiciona ID com o tipo da PK
 */
export type Formatado<T extends AnyRecord, K extends keyof T> = WithId<
  WithStatusLabel<T>,
  K
>;

/**
 * Formata uma lista:
 * - st_ativo: boolean -> 'Ativo' | 'Inativo'
 * - adiciona ID baseado na PK
 */
export function formatarStatusAtivoEId<
  T extends AnyRecord,
  K extends keyof T
>(lista: T[], primaryKey: K): Formatado<T, K>[] {
  return lista.map((item) => {
    // mantém o tipo T (não força pra AnyRecord aqui)
    const novo = { ...item } as T;

    // 1) Se tiver st_ativo, converte para texto
    if ('st_ativo' in novo) {
      const valor = (novo as AnyRecord).st_ativo;
      if (typeof valor === 'boolean') {
        (novo as AnyRecord).st_ativo = valor ? 'Ativo' : 'Inativo';
      }
    }

    // 2) Cria campo ID com base na PK, se existir no objeto
    if (primaryKey in novo) {
      (novo as AnyRecord).ID = novo[primaryKey];
    }

    return novo as Formatado<T, K>;
  });
}


