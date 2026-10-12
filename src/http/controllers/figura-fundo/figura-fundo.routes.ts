// CÓDIGO V8
// src/http/controllers/figura-fundo/figura-fundo.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const figuraFundoRouter = Router();

figuraFundoRouter.post("/", create);
figuraFundoRouter.get("/editar/:id", findById);
figuraFundoRouter.get("/visualizar/:id", findById);
figuraFundoRouter.get("/", list);
figuraFundoRouter.put("/editar/:id", update);
figuraFundoRouter.delete("/:id", softDelete);
figuraFundoRouter.get("/search", search);

export default figuraFundoRouter;
