import prismaClient from "@/lib/prisma/prisma";

type Ctx = {
  userId: number;
  login: string;
  personId: number;
  orgId: number;
  siteId: number;
};

function escapeSqlString(s: string) {
  // escape simples para aspas simples
  return s.replace(/'/g, "''");
}

function toSqlLiteral(value: unknown) {
  if (value === null || value === undefined) return "null";

  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";

  // string
  return `'${escapeSqlString(String(value))}'`;
}

export async function resolveExprTemplate(exprTemplate: string | undefined, userId: number) {
  if (!exprTemplate?.trim()) return exprTemplate;

  const user = await prismaClient.usuario.findUnique({
    where: { id_usuario: userId },
    select: {
      id_usuario: true,
      login: true,
      id_pessoa: true,
      pessoa: { select: { id_organizacao: true, id_site: true } }
    }
  });

  if (!user || !user.pessoa) return exprTemplate;

  const ctx: Ctx = {
    userId: user.id_usuario,
    login: user.login,
    personId: user.id_pessoa,
    orgId: user.pessoa.id_organizacao,
    siteId: user.pessoa.id_site
  };

  // Substitui ${userId}, ${orgId}, ${siteId}, ${login}, ${personId}
  return exprTemplate.replace(/\$\{(\w+)\}/g, (match, key: keyof Ctx) => {
    if (!(key in ctx)) {
      // melhor falhar do que devolver algo quebrado
      throw new Error(`Placeholder inválido no expr: ${match}`);
    }
    return toSqlLiteral(ctx[key]);
  });
}