import { resolveExprTemplate } from "@/utils/resolve-expr-template";
import { Request, Response } from "express";
import { getClausulaWhereForUserAndApp } from "../auth/permissions";

type RunSearch = (args: {
  expr?: string;
  filter?: string;
  onlyActive?: boolean;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: "asc" | "desc";
}) => Promise<any>;

export function makeSearchHandler(appCode: string, runSearch: RunSearch) {
  return async (req: Request, res: Response) => {
    const { sub: userId } = (req as any).user as { sub: number };

    const q = req.query as Record<string, string | undefined>;

    // 🔒 IGNORA expr do client. Sempre vem do banco
    const exprTemplate = await getClausulaWhereForUserAndApp(userId, appCode);

    let resolvedExpr: string | undefined;
    try {
    	resolvedExpr = await resolveExprTemplate(exprTemplate, userId);

    } catch (e: any) {
      return res.status(400).json({ message: e?.message ?? "Expr inválido" });
    }

    const result = await runSearch({
      expr: resolvedExpr,
      filter: q.filter,
      onlyActive: q.onlyActive ? q.onlyActive === "true" : undefined,
      page: q.page ? Number(q.page) : 1,
      pageSize: q.pageSize ? Number(q.pageSize) : 20,
      orderBy: q.orderBy || undefined,
      orderDir: q.orderDir === "desc" ? "desc" : "asc"
    });

    return res.status(200).json(result);
  };
}