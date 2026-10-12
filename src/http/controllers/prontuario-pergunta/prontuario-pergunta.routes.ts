// CÓDIGO V8
//src/http/controllers/prontuario-pergunta/prontuario-pergunta.routes.ts
import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const prontuarioPerguntaRouter = Router();

prontuarioPerguntaRouter.post("/", create);
prontuarioPerguntaRouter.get("/editar/:id", findById);
prontuarioPerguntaRouter.get("/visualizar/:id", findById);
prontuarioPerguntaRouter.get("/", list);
prontuarioPerguntaRouter.put("/editar/:id", update);
prontuarioPerguntaRouter.delete("/:id", softDelete);
prontuarioPerguntaRouter.get("/search", search);

export default prontuarioPerguntaRouter;
