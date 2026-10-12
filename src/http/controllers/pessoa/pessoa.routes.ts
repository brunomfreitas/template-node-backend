import { Router } from "express";
import { create } from "./create";
import { findById } from "./find-by-id";
import { list } from "./list";
import { search } from "./search";
import { softDelete } from "./soft-delete";
import { update } from "./update";

const pessoaRouter = Router();

pessoaRouter.post("/", create);
pessoaRouter.get("/editar/:id", findById);
pessoaRouter.get("/visualizar/:id", findById);
pessoaRouter.get("/", list);
pessoaRouter.put("/editar/:id", update);
pessoaRouter.put("/:id", softDelete);
pessoaRouter.get("/search", search);

export default pessoaRouter;
