import { Response } from "express";

export function handleError(error: unknown, res: Response, contexto = "Erro inesperado") {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: contexto });
}
